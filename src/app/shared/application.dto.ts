export interface ApplicationDTO {
  id?: number;
  centerEmail: string;
  authorName: string;
  certificationType: string;
  bookTitle: string;
  isbnCode?: string;
  publicationYear: number;
  publicationLocation: string;
  publisher: string;
  otherPublisher?: string;
  publisherWebsiteUrl?: string;
  chapterTitle?: string;
  manuscriptUrl: string;
  certificationFormUrl: string;
  extraDocumentUrls: string[];
}