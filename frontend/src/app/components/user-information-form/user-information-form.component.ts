import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { getAuth, signInWithCustomToken } from '@angular/fire/auth';
import { IUser } from 'src/app/models/IUser';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-user-information-form',
  templateUrl: './user-information-form.component.html',
  styleUrls: ['./user-information-form.component.css'],
})
export class UserInformationFormComponent implements OnChanges {
  @Input() user: IUser | undefined;
  @Output() updateUserImage = new EventEmitter();
  @Output() updateUserInfo = new EventEmitter();
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
        const auth = getAuth();
        signInWithCustomToken(auth, token)
          .then(() => {
            const storageRef = ref(
              this.storage,
              `users/${this.user?.id}/image`
            );
            const task = uploadBytesResumable(storageRef, file);

            task.on(
              'state_changed',
              () => {},
              (error) => {
                console.error(error);
              },
              () => {
                getDownloadURL(task.snapshot.ref).then((url) => {
                  this.updateUserImage.emit(url);
                });
              }
            );
          })
          .catch((err) => {
            console.error(err);
          });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.invalid) return;

    const userData = {
      name: this.userForm.value.name,
      startingWeight: this.userForm.value.startingWeight,
      currentWeight: this.userForm.value.currentWeight,
    };

    // todo
    this.updateUserInfo.emit(userData);
  }
}
