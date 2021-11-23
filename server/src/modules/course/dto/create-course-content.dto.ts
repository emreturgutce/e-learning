export class CreateCourseContentDto {
  sections: {
    title: string;
    section_contents: string[];
  }[];
}
