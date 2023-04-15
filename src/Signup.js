import React from 'react'
import './signup.css'
import { useState, useEffect } from 'react'

function Signup() {

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSumbit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((preventFormData) => ({ ...preventFormData, [name]: value }))
        console.log(formData)
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formData));
        setIsSumbit(true)
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formData)
        }
    }, [formErrors])


    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formData.fullname) {
            errors.fullname = "fullname is required"
        }
        if (!formData.email) {
            errors.email = "Email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not valid email format"
        }

        if (!formData.password) {
            errors.password = "Password is required"
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters"
        } else if (values.password.length >= 10) {
            errors.password = "Password cannot excceds more than 10 characters"
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required"
        }
        else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Password do not match"
        }
        return errors;
    }

    return (
        <div className="container login-container">
            <div className="login-form-1">
                <h1>Signup</h1><br></br>

                {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}
                <form action='' onSubmit={handlesubmit}>
                    <div>
                        <input
                            className="form-control"
                            type='text'
                            id='fullname'
                            name='fullname'
                            placeholder='fullname'
                            autoComplete='off'
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                        <p>{formErrors.fullname}</p>
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type='email'
                            id='email'
                            name='email'
                            placeholder='email'
                            autoComplete='off'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <p>{formErrors.email}</p>
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type='password'
                            id='password'
                            name='password'
                            placeholder='password'
                            autoComplete='off'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <p>{formErrors.password}</p>
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder='confirmPassword'
                            autoComplete='off'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <p>{formErrors.confirmPassword}</p>
                    </div>
                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <div className='uimessagesuccess'> Signed in successfully</div>
                    ) : (
                        <div className='uimessage'> All fields are required</div>
                    )}
                    <button className='btn' type='submit'>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup