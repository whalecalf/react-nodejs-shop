export enum USER_SEX{
    MALE="male",
    FEMALE="female",
}

export enum USER_ROLE{
    BUYER="buyer",
    SELLER="seller",
    ADMIN="admin",
}

export enum USER_STATUS{
    ON="on",
    OFF="off",
}

export enum STATUS {
  ON = 'on',
  OFF = 'off',
};

export const STATUS_OPTIONS = [
  {label: "正常", value: STATUS.ON},
  {label: "禁用", value: STATUS.OFF},
]