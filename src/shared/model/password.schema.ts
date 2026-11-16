import { z } from 'zod'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 20

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Minimum number of characters ${PASSWORD_MIN_LENGTH}`)
  .max(PASSWORD_MAX_LENGTH, `Maximum number of characters ${PASSWORD_MAX_LENGTH}`)
  .regex(
    PASSWORD_REGEX,
    'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~',
  )

export const passwordConfirmationSchema = z.string().min(1, 'Please confirm your password')
