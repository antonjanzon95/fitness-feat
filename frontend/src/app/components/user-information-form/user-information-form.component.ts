import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { IUser } from 'src/app/models/IUser';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-user-information-form',
  templateUrl: './user-information-form.component.html',
  styleUrls: ['./user-information-form.component.css'],
})
export class UserInformationFormComponent implements OnChanges {
  @Input() user: IUser | undefined;
  userForm: FormGroup | undefined;

  private readonly storage: Storage = inject(Storage);

  constructor(
    private formbuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.userForm = this.formbuilder.group({
      imageUrl: [this.user?.picture, Validators.required],
      name: [this.user?.name, Validators.required],
      workoutTime: [{ value: this.user?.workoutTime || 0, disabled: true }],
      startingWeight: [this.user?.startingWeight, Validators.required],
      currentWeight: [this.user?.currentWeight, Validators.required],
    });
  }

  handleFileInput(input: HTMLInputElement) {
    if (!input.files) return;

    const file = input.files[0];
    console.log(file);

    if (!file || !file.type.startsWith('image/')) {
      alert('Invalid file type, please upload an image');
      return;
    }

    this.generateToken(file);
  }

  generateToken(file: File) {
    this.firebaseService.generateFirebaseToken().subscribe({
      next: (token) => {
        const storageRef = ref(this.storage, `users/${this.user?.id}/image`);
        const metadata = {
          customMetadata: {
            firebaseToken: token,
          },
        };
        const task = uploadBytesResumable(storageRef, file, metadata);
        // FORTSÄTT HÄR
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // onSubmit() {
  //   if (!this.userForm) return;
  //   if (this.userForm.invalid) return;

  //   const userData = {
  //     image: this.userForm.value.imageUrl,
  //     startingWeight: this.userForm.value.startingWeight,
  //     currentWeight: this.userForm.value.currentWeight,
  //   };
  // }
}
