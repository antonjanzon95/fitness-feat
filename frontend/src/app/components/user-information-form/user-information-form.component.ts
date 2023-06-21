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
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-information-form',
  templateUrl: './user-information-form.component.html',
  styleUrls: ['./user-information-form.component.css'],
})
export class UserInformationFormComponent implements OnChanges {
  @Input() user: IUser | null | undefined;
  @Output() userChanged = new EventEmitter();
  userForm: FormGroup | undefined;

  private readonly storage: Storage = inject(Storage);

  constructor(
    private formbuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private snackBar: MatSnackBar
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
                  this.userService.updateUserImage(url).subscribe({
                    next: (user) => {
                      this.userChanged.emit();
                      this.snackBar.open(
                        'Successfully changed svatar!',
                        'Close',
                        {
                          duration: 3000,
                        }
                      );
                    },
                    error: (err) => {
                      console.error(err);
                      this.snackBar.open(
                        'Failed to change avatar. Try again.',
                        'Close',
                        {
                          duration: 3000,
                        }
                      );
                    },
                  });
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
      image: this.userForm.value.imageUrl,
      startingWeight: this.userForm.value.startingWeight,
      currentWeight: this.userForm.value.currentWeight,
    };

    // todo
  }
}
