declare module "*.json" {
    const value: any;
    export default value;
  }
  interface serviceAccount{
    type: string,
    
  }

  interface UserInstance {
    name: String;
    email: String;
    imageUrl: String;
    email_verified: String;
    role: String;
    user_id: String;
    auth_time: String;
  }