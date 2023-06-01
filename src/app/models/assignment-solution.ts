export class AssignmentSolution {
  file!: File;
  uploader!: string;
  description?: string;
  assignmentId!: string;
  constructor(
    file: File,
    uploader: string,
    description: string,
    assignmentId: string
  ) {
    this.file = file;
    this.uploader = uploader;
    this.description = description;
    this.assignmentId = assignmentId;
  }
}
