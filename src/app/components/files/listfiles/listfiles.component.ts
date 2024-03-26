import { Component, OnInit } from '@angular/core';
import { IFile } from '../../../interface/files.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-listfiles',
  templateUrl: './listfiles.component.html',
  styleUrl: './listfiles.component.css'
})
export class ListfilesComponent implements OnInit{
  files: IFile[] = [];

  constructor(private fileService: TaskService) { }

  ngOnInit(): void {
    this.fileService.getFiles().subscribe(files => {
      this.files = files;
    });
  }

  uploadFiles() {
    // Write logic to handle file upload here
    console.log('Uploading files...');
  }

  performAnotherAction() {
    // Write logic for another action here
    console.log('Performing another action...');
  }

}
