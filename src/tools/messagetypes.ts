export class MessageTypes {
  public static MESSAGE_SUCCESS = 1;
  public static MESSAGE_WARNING = 2;
  public static MESSAGE_ERROR = 3;
  public static MESSAGE_VALIDATION = 4;

  public static OBJECT_DELETE_SUCCESS = 201;

  public static RESET_CODE_SUCCESS = 202;
  public static RESET_PASSWORD_SUCCESS = 203;

  public static OBJECT_NOT_FOUND = 1000;
  public static OBJECT_FOUND = 1002;
  public static JWT_REQUIRED = 1001;

  public static USER_NOT_FOUND = 2000;
  public static USER_NOT_ACTIVE = 2001;
  public static USER_PASSWORD_NOTCORRECT = 2002;
  public static USER_FOUND_IN_SYSTEM = 2003;

  public static USER_NOT_UPDATE = 2004;
  public static USER_SOCIAL_ERROR = 2005;
  public static USER_DEFAULT_ROLE_ERROR = 2006;
  public static USER_WRONG_HASH = 2007;
  public static USER_ALREADY_TEACHER = 2008;

  public static OBJECT_ALREADY_IN_DATABASE = 2009;
}
