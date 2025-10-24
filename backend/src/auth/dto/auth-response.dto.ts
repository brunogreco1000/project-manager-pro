export class AuthResponseDto {
  user: {
    id: number;
    username: string;
    email: string;
  };
  accessToken: string;
}
