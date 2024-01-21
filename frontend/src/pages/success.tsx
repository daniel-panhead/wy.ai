import Logo from '../assets/Screenshot 2024-01-21 at 10.32.15.png'
import Button from '../components/Button'

const Success = () => {
    console.log('hi')
    return (
        <div className='flex flex-col p-8 mt-[270px] items-center place-items-center gap-8'>
            <h1 className='text-5xl font-extrabold text-brunswick-green' style={{ textShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' }}>Success!</h1>
            <img src={Logo} alt="" className='w-1/2' />
            <Button/>

        </div>
    )
}

export default Success