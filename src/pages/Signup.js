import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function Signup() {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	})
	const { email, password, name } = formData

	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const auth = getAuth()
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			const user = userCredential.user

			updateProfile(auth.currentUser, { displayName: name })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db,'users',user.uid), formDataCopy)

			navigate('/')
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Hello!</p>
				</header>

				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Name'
						className='nameInput'
						id='name'
						value={name}
						onChange={handleChange}
					/>
					<input
						type='email'
						placeholder='Email'
						className='emailInput'
						id='email'
						value={email}
						onChange={handleChange}
					/>

					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							placeholder='Password'
							id='password'
							value={password}
							onChange={handleChange}
						/>
						<img
							src={visibilityIcon}
							alt='Show Password'
							className='showPassword'
							onClick={() => setShowPassword(!showPassword)}
						/>
					</div>

					<div className='signUpBar'>
						<p className='signUpText'>Sign Up</p>
						<button className='signUpButton'>
							<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
						</button>
					</div>
				</form>

				<OAuth/>

				<Link to='/sign-in' className='registerLink'>
					Sign In Instead
				</Link>
			</div>
		</>
	)
}

export default Signup
