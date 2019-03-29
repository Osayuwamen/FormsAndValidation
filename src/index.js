// Import the React abd ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { withFormik, Form, Field} from 'formik';
import  * as Yup from 'yup';


// Create a react component

const App = ({
    values,
    errors,
    touched,
    isSubmitting
}) => (
    <Form>
        <div>
            <Field type="email" name="email" placeholder="Email" />
            {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div>
            <Field type="password" name="password" placeholder="Password"/>
            {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <label>
            <Field type="checkbox" name="newsletter" checked={values.newsletter}/>
            Join the label
        </label>
        <Field component="select" name="plan">
            <option value="free">Free</option>
            <option value="premium">Premium</option>
        </Field>
        <button disabled={isSubmitting}>Submit</button>
    </Form>
)
const FormikApp = withFormik ({
    mapPropsToValues({ email, password, newsletter, plan}){
        return {
            email: email || '',
            password: password || '',
            newsletter: newsletter || true,
            plan: plan || 'premium'
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email is not valid').required('Email is required'),
        password: Yup.string().min(9, 'Password must be 9 characters or lower').required()    
    }),
    handleSubmit(values, {resetForm, setErrors, setSubmitting}){
        setTimeout(() => {
            if(values.email === 'james@gmail.com') {
                setErrors({email: 'That email is already taken'})
            } else {
                resetForm()
            }
            setSubmitting(false)
        }, 2000)
    }
})(App)



// Take the react component and show it on the screen
ReactDOM.render(
    <FormikApp />,
    document.querySelector('#root')
);