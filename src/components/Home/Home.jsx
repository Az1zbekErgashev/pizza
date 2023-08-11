
import React from 'react'
import './Home.css'
import './Card.css'
import data from '../Utils/data'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodsFromLocalStorage } from '../Redux/localStorate'


export default function Home() {
    const dispatch = useDispatch()
    const switcher = useSelector(state => state.Switcher.switcher)
    const [val, setVal] = useState('')
    const [state, setState] = useState('iteam1')
    const [meal, setMeal] = useState([])
    const [Number, setNumber] = useState(true)
    const run = () => {
        data.getMeal()
            .then(res => {
                setMeal(res.slice(0, 4))
            })
    }

    const filter = (a, b) => {
        data.getMeal()
            .then(res => {
                setMeal(res.slice(a, b))
            })
    }

    const pushArray = (iteam) => {
        const existingObject = switcher.find(obj => obj.id === iteam.id);

        if (existingObject) {
            const updatedObjects = switcher.map(obj => {
                if (obj.id === iteam.id) {
                    return { ...obj, countShop: obj.countShop + 1 };
                }
                return obj;
            });
            localStorage.setItem('FoodsArray', JSON.stringify(updatedObjects))
            dispatch(getFoodsFromLocalStorage())

        } else {
            const newFoodsArray = [...switcher, iteam]
            localStorage.setItem('FoodsArray', JSON.stringify(newFoodsArray))
            dispatch(getFoodsFromLocalStorage())
        }

    }



    const click = (iteam) => {
        setState(iteam)
    }

    useEffect(() => {
        if (Number === true) {
            run()
        }
    }, [])
    useEffect(() => {
        dispatch(getFoodsFromLocalStorage())
    }, [])



    const Navbar = (
        <div className='Navbar'>
            <div className='Navbar__flex container'>
                <div className='Navbar__text'>
                    <h1>Jaegar Resto </h1>
                </div>
                <div className='Navbar__search'>
                    <i className='bi bi-search'></i>
                    <input onChange={(i) => setVal(i.target.value)} type="text" placeholder='Search for food, coffe, etc..' />
                </div>
            </div>
        </div>
    )



    const categoriy = (
        <div className='categoriy'>
            <div className='categoriy__row container g-0'>
                <div onClick={() => { click('iteam1'); filter(0, 4) }} className={`${(state === 'iteam1') ? 'active__Categoriy' : ''} col-2`}>Hot Dishes</div>
                <div onClick={() => { click('iteam2'); filter(4, 8); setNumber(false) }} className={`${(state === 'iteam2') ? 'active__Categoriy' : ''} col-2`}>Cold Dishes</div>
                <div onClick={() => { click('iteam3'); filter(8, 12); setNumber(false) }} className={`${(state === 'iteam3') ? 'active__Categoriy' : ''} col-2`}>Soup</div>
                <div onClick={() => { click('iteam4'); filter(12, 16); setNumber(false) }} className={`${(state === 'iteam4') ? 'active__Categoriy' : ''} col-2`}>Grill</div>
                <div onClick={() => { click('iteam5'); filter(16, 20); setNumber(false) }} className={`${(state === 'iteam5') ? 'active__Categoriy' : ''} col-2`}>Appetizer</div>
                <div onClick={() => { click('iteam6'); filter(20, 24); setNumber(false) }} className={`${(state === 'iteam6') ? 'active__Categoriy' : ''} col-2`}>Dessert</div>
            </div>
        </div>
    )


    const select = (
        <div className='Selected__type container'>
            <h4>Choose Dishes</h4>
            <select name="" id="">
                <option selected>Select ...</option>
                <option value="">Price</option>
            </select>
        </div>
    )
    
    const updateMeal = meal.filter(i => {
        return i.text.toLowerCase().includes(val.toLowerCase())
    })

    const Card = (
        <div>
            {
                (meal.length > 0) ? <div  className={`${(updateMeal.length === 0 ) ? 'd-none' : 'cardd'} cardd`}>
                    {
                        updateMeal.map((item, index) => {
                            return (
                                <div className='card__row' key={index}>
                                    <div className="card__img">
                                        <img src={item.url} alt="" />
                                    </div>
                                    <div className="card__text">
                                        {item.text}
                                    </div>
                                    <div className="card__cost">
                                        $ {item.cost}
                                    </div>
                                    <div className="card__count">
                                        {item.count}
                                    </div>
                                    <div className="card__add">
                                        <button onClick={() => pushArray(item)}>{item.btn}</button>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div> : <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }

        </div>
    )
    const Noresult = (
        <div className={`${(updateMeal.length === 0 ? 'd-block' : 'd-none')} Noresult`}>Ничего не нашлось</div>
    )
     
    return (
        <div className='Index__Site container'>
            {Navbar}
            {categoriy}
            {select}
            {Card}
            {Noresult}
        </div>
    )
}
