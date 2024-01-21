import Logo from '../assets/success_cat.svg'
import Button from '../components/Button'

const Success = () => {
    console.log('hi')
    return (
        <div className='flex flex-col p-8 mt-[270px] items-center place-items-center gap-8'>
            <h1 className='text-5xl font-extrabold text-brunswick-green' style={{ textShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' }}>Success!</h1>
            <img src={Logo} alt="" className='w-1/2' />
            <div className=" w-[70px] h-[50px] rounded-full bg-[#fbc0fc] opacity-40 absolute bottom-[40px] right-[560px]"></div>
            <div className=" w-[70px] h-[50px] rounded-full bg-[#fbc0fc] opacity-40 absolute bottom-[40px] left-[565px]"></div>
            <Button/>

        </div>
    )
}

export default Success