export interface IUploadUserAvatarFx {
  jwt: string
  formData: FormData
}

export interface IBaseEditUser {
  jwt: string
  setEdit: (arg0: boolean) => void
}

export interface IEditUsernameFx extends IBaseEditUser {
  name: string
}

export interface IProfileInfoActionsProps {
  spinner: boolean
  handleSaveInfo: VoidFunction
  disabled: boolean
  handleCancelEdit: VoidFunction
}

export interface IProfileInfoBlockProps {
  allowEdit: VoidFunction
  text: string
}
