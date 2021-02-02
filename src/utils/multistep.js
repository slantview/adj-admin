import * as Yup from 'yup';

export default class MultiStep {
    constructor(initialValues = {}, schema = {}) {
        this.values = initialValues;
        this.schema = schema;

        // Iterate schema and get items so we can set errors to null so we know
        // that they are initialized.
        this.errors = {}
        for (const i in schema) {
            this.errors[i] = null;
        }
        // Iterate touched and set them to false from the schema so we know we
        // haven't touched them yet.
        this.touched = {}
        for (const i in schema) {
            this.touched[i] = false;
        }
    }

    get values() {
        return this.values;
    }

    set(name, value) {
        if (!name) {
            return false;
        }
        this.values[name] = value;
        this.touched[name] = true;
    }

    isValid() {
        return true;
    }
}