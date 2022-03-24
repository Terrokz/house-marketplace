import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import  { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import Spinner from './Spinner'

function Slider() {
	const [loading, setLoading] = useState(true)
	const [listings, setListings] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchListings = async () => {
			const listingsRef = collection(db, 'listings')
			const q = query(listingsRef, orderBy('timestamp', 'desc'))
			const querySnap = await getDocs(q)

			let listings = []

			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})

			setListings(listings)
			setLoading(false)
		}

		fetchListings()
	}, [])

	if (loading) {
		return <Spinner />
	}

	return (
		listings && (
			<>
				<p className='exploreHeading'>Latest</p>
				<Swiper
					slidesPerView={1}
					pagination={{ clickable: true }}
					modules={[Navigation, Pagination, A11y]}
					//navigation
					//scrollbar={{ draggable: true }}
				>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() => navigate(`/category/${data.type}/${id}`)}
						>
							{/* IMAGE WITHOUT TEXT
                     
                     <img src={`${data.imgUrls[0]}`} alt="img" style={{maxHeight: '300px', display: 'block', marginRight: 'auto', marginLeft: 'auto'}} />
                      */}

							<div
								style={{
									background: `url(${data.imgUrls[0]}) center no-repeat `,
									backgroundSize: 'cover',
								}}
								className='swiperSlideDiv'
							>
								<p className='swiperSlideText'>{data.name}</p>
								<p className='swiperSlidePrice'>
									${data.discountedPrice ?? data.regularPrice}
                           {data.type=== 'rent' && ' / month'}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	)
}

export default Slider
