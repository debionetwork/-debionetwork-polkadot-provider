export class DnaTestResultSubmission {
  constructor(anyJson: any) {
    this.comments = anyJson.comments;
    this.resultLink = anyJson.resultLink;
    this.reportLink = anyJson.reportLink;
  }
  comments: string;
  resultLink: string;
  reportLink: string;
}
