/* eslint-disable default-case */
import React, { useState, useEffect } from 'react'
import './SiteBar.css'
import BoughtFoods from './BoughtFoods';
import EmptyBox from './EmptyBox';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodsFromLocalStorage } from '../Redux/localStorate';
import Offcanvas from './Offcanvas';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SiteBar() {
  const [payFoods, setPayFoods] = useState(false)
  const [activeItem2, setActiveItem2] = useState('item1');
  const [numbers, setNumbers] = useState('');
  const [activeItem3, setActiveItem3] = useState('item1');
  const [activeItem, setActiveItem] = useState('item2');
  const switcher = useSelector(state => state.Switcher.switcher)
  const [offcansHome, setOffcansHome] = useState(true)
  const [nameVal, setNameVal] = useState('')
  const [cardVal, setCardVal] = useState('')
  const [DateVal, setDateVal] = useState('')
  const [TableVal, setTableVal] = useState('')
  const [CvvVal, setCvvVal] = useState('')
  const [open, setOpen] = React.useState(false);


  const pattern = /^\d+$/;
  const pattern2 = /^[A-Za-z]+$/;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFoodsFromLocalStorage())
  }, [])



  const click = (item) => {
    setActiveItem(item);
  };

  const pay = () => {
    if (payFoods === true) {
      setPayFoods(false)
    }
    else {
      setPayFoods(true)
    }
  }

  const clickOffcansBtn = (item) => {
    setActiveItem2(item)
  }
  const clickPayFoodBtn = (item) => {
    setActiveItem3(item)
  }

  const handleChange = (event) => {
    const inputNumbers = event.target.value.replace(/\s/g, '');
    setCardVal(inputNumbers)
    const formattedNumbers = inputNumbers.replace(/(\d{4})/g, '$1 ');
    setNumbers(formattedNumbers);
  }

  // Notification

  const confirmPayment = () => {
    if (CvvVal.length === 3 && pattern.test(CvvVal) && pattern2.test(nameVal) && DateVal.length === 10 && cardVal.length === 16 && pattern.test(cardVal)) {
      setOpen(true);

    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  const notification = (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Спасибо мы приняли ваш заказ !
        </Alert>
      </Snackbar>
    </Stack>
  )

  const shop = (
    <>
      {
        (offcansHome === true) ? <>
          <div className='offcanvas-end offcanvas' tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">
                {(switcher.length === 0 ? <div>{
                  (switcher.length > 0) ? '' : 'ORDERS'
                } </div> : '')}</h5>
            </div>
            <>

              {
                (payFoods === false) ?
                  <div class="offcanva">
                    {
                      (switcher.length > 0) ? <div className='offcanss__body'>
                        <div className='offcans_info_header'>
                          <i type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='closeIcon bi bi-arrow-left'></i>
                          <h5 className="offcanvas-title mx-2" id="offcanvasRightLabel">{
                            (switcher.length > 0) ? ` #ORDERS ${Math.floor(Math.random() * 3000) + 9000}` : ''
                          } </h5>
                        </div>
                        <div className='offcanss_info_header_group_btn'>
                          <button className={`${(activeItem2 === 'item1') ? 'active2' : ""} col-4 offcanss_info_header_btn`} onClick={() => clickOffcansBtn('item1')}>Dine In</button>
                          <button className={`${(activeItem2 === 'item2') ? 'active2' : ""} col-4 offcanss_info_header_btn`} onClick={() => clickOffcansBtn('item2')}>To Go</button>
                          <button className={`${(activeItem2 === 'item3') ? 'active2' : ""} col-4 offcanss_info_header_btn`} onClick={() => clickOffcansBtn('item3')}>Delivery</button>
                        </div>
                        <div className='offcans_info_body'>
                          <div>
                            <p>Item</p>
                          </div>
                          <div className='offcans_info_body_text_2'>
                            <p>Qty</p>
                            <p>Price</p>
                          </div>
                        </div>
                        <BoughtFoods />
                      </div>
                        :
                        <EmptyBox />
                    }
                    {(switcher.length === 0) ? <button data-bs-dismiss="offcanvas" aria-label="Close" className='text-white close__btn'>To Order</button> : <button onClick={pay} type="button" className='text-white open_btn'>Continue to Payment</button>}

                  </div>
                  :
                  <div>
                    <>
                      {
                        (payFoods) && <div>
                          <div className='payFood'>
                            <h4 className='text-white'>Payment</h4>
                            <p className='text-white'>{switcher.length} payment method available</p>
                          </div>
                          <div className='payFood'>
                            <h4 className='text-white'>Payment Method</h4>
                            <div className='payFood_btn'>
                              <div className={`${(activeItem3 === 'item1') ? 'active3' : ""} payFood_btnDiv`} onClick={() => clickPayFoodBtn('item1')}>
                                <i className='bi bi-credit-card'></i>
                                <p>Credit Card</p>
                              </div>
                              <div className={`${(activeItem3 === 'item2') ? 'active3' : ""} payFood_btnDiv`} onClick={() => clickPayFoodBtn('item2')}>
                                <i className='bi bi-paypal'></i>
                                <p>Paypal</p>
                              </div>
                              <div className={`${(activeItem3 === 'item3') ? 'active3' : ""} payFood_btnDiv`} onClick={() => clickPayFoodBtn('item3')}>
                                <i className='bi bi-cash-coin my-2'></i>
                                <p>Cash</p>
                              </div>
                            </div>
                          </div>
                          <div className='payFood_row'>
                            <h5 className='text-white'>Cardholder Name</h5>
                            <input className='input_4' pattern='[A-z]*' type="text" placeholder='Levi Ackerman' onChange={(i) => setNameVal(i.target.value)} />
                          </div>
                          <div className='payFood_row'>
                            <h5 className='text-white'>Card Number</h5>
                            <textarea
                              value={numbers}
                              onChange={handleChange}
                              placeholder='2564 1421 0897 1244' maxLength={19}
                              className='input_4'
                            />
                          </div>
                          <div>
                            <div className='payFood__d_flex'>
                              <h5 className='text-white'>Expiration Date</h5>
                              <h5 className='text-white'>CVV</h5>
                            </div>
                            <div className='payFood__d_flex'>
                              <input onChange={(i) => setDateVal(i.target.value)} className='input_4' pattern='[0-9]*' type="date" placeholder='02/2022' />
                              <input onChange={(i) => setCvvVal(i.target.value)} className='input_4' pattern='[0-9]*' type="password" placeholder=' * * *' maxLength={3} />
                            </div>
                          </div>
                          <div>
                            <div className='payFood__d_flex'>
                              <h5 className='text-white'>Order Type</h5>
                              <h5 className='text-white'>Table no.</h5>
                            </div>
                            <div className='payFood__d_flex'>
                              <select name="" id="">
                                <option selected>Choose</option>
                                <option value="">Privet</option>
                                <option value="">Poka</option>
                              </select>
                              <input onChange={(i) => setTableVal(i.target.value)} type="text" placeholder='140' className='input_4' maxLength={3} pattern='[0-9]*' />
                            </div>
                          </div>
                          <div className='payFood__d_flex_btn'>
                            <button onClick={() => setPayFoods(false)}>Cancel</button>

                            <button variant="outlined" className='btn_pay' onClick={() => { confirmPayment() }}>Confirm Payment</button>
                          </div>
                        </div>
                      }
                    </>
                  </div>
              }
            </>
          </div>
        </> : <Offcanvas />
      }
    </>
  )

  const SiteBarMobile = (
    <div className="row MobileSiteBar">
      <div className={`${activeItem === 'item1' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className={`${activeItem === 'item1' ? 'active' : ''} bi bi-list SiteBar__Index`} onClick={() => { click('item1'); }}></i></div>
      <div className={`${activeItem === 'item4' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i className={`${activeItem === 'item4' ? 'active' : ''} bi bi-slash-circle SiteBar__Index`} onClick={() => click('item4')}></i></div>
      <div className={`${activeItem === 'item2' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i className={`${activeItem === 'item2' ? 'active' : ''} bi bi-house SiteBar__Index`} onClick={() => click('item2')}></i></div>
      <div className={`${activeItem === 'item7' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className={`${activeItem === 'item7' ? 'active' : ''} bi bi-cart SiteBar__Index`} onClick={() => { click('item7'); }}></i></div>
      <div className={`${activeItem === 'item8' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><Link to='/login'><i  variant="outlined"  className={`${activeItem === 'item8' ? 'active' : ''} bi bi-person SiteBar__Index`} onClick={() => {click('item8');  }}></i></Link></div>
    </div>
  )


  const SiteBar = (
    <div className="row SiteBarDecktop ">
      <div className={`${activeItem === 'item1' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className={`${activeItem === 'item1' ? 'active' : ''} bi bi-list SiteBar__Index`} onClick={() => { click('item1'); }}></i></div>
      <div className={`${activeItem === 'item2' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i className={`${activeItem === 'item2' ? 'active' : ''} bi bi-house SiteBar__Index`} onClick={() => click('item2')}></i></div>
      <div className={`${activeItem === 'item3' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i className={`${activeItem === 'item3' ? 'active' : ''} bi bi-gear SiteBar__Index`} onClick={() => click('item3')}></i></div>
      <div className={`${activeItem === 'item4' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i className={`${activeItem === 'item4' ? 'active' : ''} bi bi-slash-circle SiteBar__Index`} onClick={() => click('item4')}></i></div>
      <div className={`${activeItem === 'item5' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i className={`${activeItem === 'item5' ? 'active' : ''} bi bi-inbox SiteBar__Index`} onClick={() => click('item5')}></i></div>
      <div className={`${activeItem === 'item6' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i className={`${activeItem === 'item6' ? 'active' : ''} bi bi-bell SiteBar__Index`} onClick={() => click('item6')}></i></div>
      <div className={`${activeItem === 'item7' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><i data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className={`${activeItem === 'item7' ? 'active' : ''} bi bi-cart SiteBar__Index`} onClick={() => { click('item7'); }}></i></div>
      <div className={`${activeItem === 'item8' ? 'active__iteam' : ''} SiteBar__Iteam col-12`}><Link to='/login'><i  variant="outlined"  className={`${activeItem === 'item8' ? 'active' : ''} bi bi-person SiteBar__Index`} onClick={() => {click('item8');  }}></i></Link></div>
    </div>
  )

  const offcansHomeeee = (
    <div>

    </div>
  )

  return (
    <div className=''>
      {SiteBarMobile}
      {SiteBar}
      {shop}
      {offcansHomeeee}
      {notification}
    </div>
  )
}
