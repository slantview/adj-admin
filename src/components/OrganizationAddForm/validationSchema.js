import * as Yup from 'yup';

export const validationSchema = Yup.object({
    patreon: Yup.string().url(),
    linkedin: Yup.string().url(),
    youtube: Yup.string().url(),
    twitter: Yup.string().url(),
    instagram: Yup.string().url(),
    discord: Yup.string().url(),
    twitch: Yup.string().url(),
    facebook: Yup.string().url(),
    email: Yup.string().email().required('Email is required'),
    website: Yup.string().url().required('Website is required'),
    about: Yup.string().required('About is required'),
    logo: Yup.array().required('Logo is required'),
    country: Yup.string().required('Country is required'),
    postal_code:  Yup.string().required('Postal Code is required'),
    state: Yup.string().required('State/Province is required'),
    city: Yup.string().required('City is required'),
    address_line_1: Yup.string().required("Address is required"),
    name: Yup.string().required('Name is required')
});