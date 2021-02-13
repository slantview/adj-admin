import * as Yup from 'yup';

export default Yup.object({
    logo: Yup.array().required('Logo is required'),
    country: Yup.string().required('Country is required'),
    postal_code:  Yup.string().required('Postal Code is required'),
    state: Yup.string().required('State/Province is required'),
    city: Yup.string().required('City is required'),
    address_line_1: Yup.string().required("Address is required"),
    name: Yup.string().required('Name is required')
});