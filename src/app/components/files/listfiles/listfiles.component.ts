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

  /*
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

*/

displayFileContent(fileId?: number) {
  if (fileId !== undefined) {
    this.fileService.getFileContent(fileId).subscribe(
      (fileContent: Blob) => {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          if (fileContent.type.includes('image')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(fileContent);
            newWindow.document.body.appendChild(img);
          } else if (fileContent.type.includes('pdf')) {
            const iframe = document.createElement('iframe');
            iframe.width = '800px'; // Set the width of the iframe
            iframe.height = '600px';
            iframe.src = URL.createObjectURL(fileContent);
            newWindow.document.body.appendChild(iframe);
          } else if (fileContent.type.includes('text')) {
            const pre = document.createElement('pre');
            const reader = new FileReader();
            reader.onload = () => {
                pre.textContent = reader.result as string;
            };
            reader.readAsText(fileContent);
            newWindow.document.body.appendChild(pre);
        }
          else {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(fileContent);
            downloadLink.download = `file_${fileId}`;
            downloadLink.innerText = 'Download File';
            newWindow.document.body.appendChild(downloadLink);
          }
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


deleteFile(fileId?: number) {
  if (fileId !== undefined) {
    if (confirm("Are you sure you want to delete this file?")) {
      this.fileService.deleteFile(fileId).subscribe(() => {
        // Refresh file list after successful deletion
        this.refreshFiles();
      }, error => {
        console.error('Error deleting file:', error);
      });
    }
  } else {
    console.error('File ID is undefined');
  }
}

downloadFile(id?: number): void {
  if (id === undefined) {
    console.error('File ID is undefined.');
    return;
  }

  this.fileService.downloadFile(id).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloadedFile';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, error => {
    console.error('Error downloading file:', error);
  });
}

}
