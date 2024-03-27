import { Component, OnInit } from '@angular/core';
import { IFile } from '../../../interface/files.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-listfiles',
  templateUrl: './listfiles.component.html',
  styleUrls: ['./listfiles.component.css']
})
export class ListfilesComponent implements OnInit {
  files: IFile[] = [];

  constructor(private fileService: TaskService) { }

  ngOnInit(): void {
    this.refreshFiles();
  }

  refreshFiles() {
    this.fileService.getFiles().subscribe(files => {
      this.files = files;
    });
  }

  uploadFile(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.fileService.uploadFile(formData).subscribe(() => {
        // Refresh file list after successful upload
        this.refreshFiles();
      }, error => {
        console.error('Error uploading file:', error);
      });
    }
  }

  displayFileContent(fileId?: number) {
    if (fileId !== undefined) {
      this.fileService.getFileContent(fileId).subscribe(
        (fileContent: string) => {
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.document.write(fileContent);
          } else {
            alert('Please allow popups for this website');
          }
        },
        error => {
          console.error('Error fetching file content:', error);
        }
      );
    } else {
      console.error('File ID is undefined');
    }
}

  
  
}
