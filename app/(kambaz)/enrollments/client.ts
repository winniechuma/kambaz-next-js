import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// const ENROLLMENT_API = `${HTTP_SERVER}/api/enrollments`;
// export const enrollUserInCourse = async (userId: any, courseId: any) => {
//   const { data } = await axiosWithCredentials.post(ENROLLMENT_API, { userId, courseId });
//   return data;
// };

// export const unenrollUserFromCourse = async (userId: any, courseId: any) => {
//   const { data } = await axiosWithCredentials.delete(ENROLLMENT_API, { data: { userId, courseId } });
//   return data;
// };

export const enrollUserInCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};
