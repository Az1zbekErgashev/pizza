import React, { useState, useEffect } from 'react'
import data from '../Utils/data'




export default function EmptyBox() {
    const [img, setImg] = useState([])

    useEffect(() => {
        run()
    }, [])


    const run = () => {
        data.getEat()
            .then(res => {
                setImg(res)
            })
    }



    return (
        <>
            <div>
                {(img.length > 0) && img.map((iteam, index) => {
                    return (
                        <div className='order' key={index}>
                            <div>
                                <img className='my-4' src={iteam.img} alt="foto" />
                                <h4 className='text-white text-center'>{iteam.text}</h4>
                                <h6 className='text-white text-center'>{iteam.text1}</h6>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
