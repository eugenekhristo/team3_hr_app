import {Component} from '@angular/core';
import { MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'hr-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent {

  name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor( public dialogRef: MatDialogRef<AddSkillComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onYesClick() {
    if(this.name.valid) {
      (this.dialogRef as any).addSkill(this.name.value);
    }

    this.dialogRef.close();
  }

}
