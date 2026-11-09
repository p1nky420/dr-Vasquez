import programs from "./academia-programas.json";

export const academyPrograms = programs;
export type AcademyProgram = (typeof academyPrograms)[number];

export function academyProgramPath(slug: string) {
  return `/academia/${slug}`;
}
