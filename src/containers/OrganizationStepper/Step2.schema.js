import * as Yup from 'yup';

export default Yup.object({
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
    about: Yup.string().required('About is required')
});