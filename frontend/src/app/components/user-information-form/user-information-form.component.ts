import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
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
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app.state';
import { selectCurrentUser } from 'src/app/state/user/user.selector';
import { Subscription } from 'rxjs';
import { WeightEntryFormComponent } from '../weight-entry-form/weight-entry-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-information-form',
  templateUrl: './user-information-form.component.html',
  styleUrls: ['./user-information-form.component.css'],
})
export class UserInformationFormComponent implements OnDestroy, OnInit {
  user$ = this.store.select(selectCurrentUser);
  user: IUser | null = null;
  @Output() updateUserImage = new EventEmitter();
  @Output() updateUserInfo = new EventEmitter();
  userForm: FormGroup = this.formbuilder.group({});
  subscription: Subscription | undefined;
  imperial = false;

  private readonly storage: Storage = inject(Storage);

  constructor(
    private formbuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private store: Store<IAppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.user$.subscribe((user: IUser | null) => {
      if (user) {
        console.log(user);
        this.user = user;
        this.initializeForm();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  initializeForm() {
    this.userForm = this.formbuilder.group({
      name: [this.user?.name, Validators.required],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WeightEntryFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
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
