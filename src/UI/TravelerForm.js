import React, { useRef, useState, useEffect } from 'react'
import Axios from 'axios'
import QRCode from 'qrcode.react'
import styled from 'styled-components'

import {
    InputBox,
    ModalLabel,
    InputFieldModal,
    FormContainer,
    Form,
    DataValue,
    BtnLarge,
  } from './CommonStylesForms'

  const FormWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  background: white;
`

  const HeaderVerify = styled.div`
  color: ${(props) => props.theme.primary_color};
  font-size: 30px;
`

  const QR = styled(QRCode)`
  display: block;
  margin: auto;
  padding: 20px;
  background: #fff;
`

function TravelerForm() {
  const [invitation, setInvitation] = useState('')
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [verification, setVerification] = useState({})
  const [errMessage, setErrMessage] = useState('')
  const [toggleForm, setToggleForm] = useState(false)
  const [hotelDetails, sethotelDetails] = useState({})

  const effectRan = useRef()
  const newForm = useRef()

  // invitation
  useEffect(() => {

    //(AmmonBurgi) Prevent from triggering twice. See React strict mode.
  if (effectRan.current === true) {
    Axios({ 
      method: "POST",
      url: `/api/invitations`,
    }).then((res) => {
      console.log('Invitation:', res.data)

      setInvitation(res.data)
    }).catch(err => {
      console.log('Error: ', err)
      if (err.response.data.message) {
        setErrMessage(err.response.data.message)
      }
    })
  }

  return () => {
    effectRan.current = true
    }
  }, [])

  // verification and credentials
  useEffect(() => {
    if (invitation.invitation_id && !verificationComplete) {
      Axios({
        method: 'POST',
        url: `/api/verifications`,
        data: {
          connection_id: invitation.connection_id,
          contact_id: invitation.contact_id,
          invitation_id: invitation.invitation_id
        },
        timeout: 1000 * 60 * 35
      }).then(verRes => {
        setVerificationComplete(true)

        console.log('Verification:', verRes)
        
        let verifiedAttributes = {}
        verRes.data.result_data.forEach((attributes, index) => {
          verifiedAttributes[attributes.name] = attributes.value
        })

        setVerification({connectionId: verRes.data.connection_id, verifiedAttributes: verifiedAttributes})
      }).catch(err => {
        console.error('Error: ', err)
        if (err.response.data.message) {
          setErrMessage(err.response.data.message)
        }
      })
    }

  }, [invitation, verificationComplete])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(newForm.current)
        const formData = {
            traveler_phone: form.get('traveler_phone'),
            traveler_email: form.get('traveler_email'),
            traveler_country: form.get('traveler_country'),
            traveler_country_of_origin: form.get('traveler_country_of_origin'),
            arrival_airline: form.get('arrival_airline'),
            arrival_flight_number: form.get('arrival_flight_number'),
            arrival_date: form.get('arrival_date'),
            arrival_destination_port_code: form.get('arrival_destination_port_code'),
            arrival_destination_country_code: form.get('arrival_destination_country_code'),
            departure_airline: form.get('departure_airline'),
            departure_flight_number: form.get('departure_flight_number'),
            departure_date: form.get('departure_date'),
            departure_destination_port_code: form.get('departure_destination_port_code'),
            departure_destination_country_code: form.get('departure_destination_country_code'),
          }

          console.log(verification.connectionId)

      //     Axios({
      //       method: 'POST',
      //       url: `/api/credentials/`,
      //       data: {
      //         travelerData: formData, 
      //         dtcData: verification.verifiedAttributes, 
      //         connectionId: verification.connectionId
      //       }
      //     }).then(() => {
            setFormSubmitted(true)
      //     }).catch(err => {
      //       console.error('Error: ', err)
      //       if (err.response.data.message) {
      //         setErrMessage(err.response.data.message)
      //       }
      //     })
      }

      const selectOption = (option) => {
        switch(option) {
          case 'option_one':
            console.log(option)
            sethotelDetails({
              one_title: 'Mr',
              one_address: '1234 Woodscross Way',
              one_city: 'Scranton',
              one_postal_code: '85921',
              one_state: 'Pennsylvania',
              one_place_of_birth: 'Los Angeles',
              one_email: 'mike_scarn@dunder.com',
              one_phone_number: '801-553-1233',
              one_anniversary_date: '1999-01-08',
              one_occasion: 'Vacation',
              two_title: 'Mrs',
              two_first_name: 'Jane',
              two_last_name: 'Doe',
              two_address: '555 John Stockton Street',
              two_city: 'Miami',
              two_postal_code: '87552',
              two_state: 'Florida',
              two_country: 'USA',
              two_date_of_birth: '1990-04-04',
              two_place_of_birth: 'USA',
              two_email: 'pam@mifflin.com',
              two_phone_number: '801-999-2231',
              two_anniversary_date: '1995-11-11',
              two_occasion: 'Work',
              hotel_repeat_guest: 'No',
              hotel_check_in_date: '2022-09-25',
              hotel_check_out_date: '2022-09-30',
              hotel_arrival_date: '2022-09-25',
              hotel_arrival_flight: 'Delta',
              hotel_departure_date: '2022-09-30',
              hotel_departure_flight: 'American',
              hotel_notes: 'No notes as of now',
            })
  
          break;
          
          case 'option_two':
            console.log(option)
            sethotelDetails({
              one_title: 'Mr',
              one_address: '321 Forest Drive',
              one_city: 'Provo',
              one_postal_code: '11421',
              one_state: 'Utah',
              one_place_of_birth: 'USA',
              one_email: 'hello@gmail.com',
              one_phone_number: '801-995-2230',
              one_anniversary_date: '1982-09-04',
              one_occasion: 'Work',
              two_title: 'Ms',
              two_first_name: 'Sally',
              two_last_name: 'Wynn',
              two_address: '623 Snow Way',
              two_city: 'Dallas',
              two_postal_code: '84502',
              two_state: 'Texas',
              two_country: 'USA',
              two_date_of_birth: '1975-04-05',
              two_place_of_birth: 'USA',
              two_email: 'hi@gmail.com',
              two_phone_number: '801-685-8890',
              two_anniversary_date: '1990-12-12',
              two_occasion: 'Vacation',
              hotel_repeat_guest: 'No',
              hotel_check_in_date: '2022-09-26',
              hotel_check_out_date: '2022-09-28',
              hotel_arrival_date: '2022-09-26',
              hotel_arrival_flight: 'Spirit',
              hotel_departure_date: '2022-09-28',
              hotel_departure_flight: 'Singapore',
              hotel_notes: 'Customer is king',
            })

            break;

          default:
            sethotelDetails({
              one_title: '',
              one_address: '',
              one_city: '',
              one_postal_code: '',
              one_state: '',
              one_place_of_birth: '',
              one_email: '',
              one_phone_number: '',
              one_anniversary_date: '',
              one_occasion: '',
              two_title: '',
              two_first_name: '',
              two_last_name: '',
              two_address: '',
              two_city: '',
              two_postal_code: '',
              two_state: '',
              two_country: '',
              two_date_of_birth: '',
              two_place_of_birth: '',
              two_email: '',
              two_phone_number: '',
              two_anniversary_date: '',
              two_occasion: '',
              hotel_repeat_guest: '',
              hotel_check_in_date: '',
              hotel_check_out_date: '',
              hotel_arrival_date: '',
              hotel_arrival_flight: '',
              hotel_departure_date: '',
              hotel_departure_flight: '',
              hotel_notes: '',
            })
            break;
        }
      }

      let attributes = verification.verifiedAttributes ? verification.verifiedAttributes : {}

      const passportDisplay = (
        <div>
          {console.log(verification.verifiedAttributes)}
                  <div className="plane-row">
                   <div className="one-third-column">
                    <div className="title-center-text">
                       Submit Passport Details
                     </div>
                   </div>
                   <div className="two-third-column"></div>
                 </div>
                 <div className="bar-row">
                   <span className="bold-bar-text">
                     Review:
                   </span>
                     <span className='bar-text'>
                      Travelers receive confirmation that their DTC credential details
                       were successfully received by the system
                     </span>
                 </div>
                 <div className='content-row'>
                   <div className='one-third-column'>
                     <div className='content-text'>
                       Thank you for sharing your DTC credential with us.
                       Here is the information we received.
                     </div>
                     <p className='spacing'><BtnLarge onClick={() => setToggleForm(true)}>Continue →</BtnLarge></p>
                   </div>
                   <div className='two-third-column'>
                      <div className='passport-div'>
                       <span className='type'>{attributes['document-type'] ? attributes['document-type'] : ''}</span>
                       <span className='country-code'>UTO</span>
                       <span className='passport-number'>{attributes['document-number'] ? attributes['document-number'] : ''}</span>
                       <span className='surname'>{attributes['family-name'] ? attributes['family-name'] : ''}</span>
                       <span className='given-names'>{attributes['given-names'] ? attributes['given-names'] : ''}</span>
                       <span className='nationality'>{attributes.nationality ? attributes.nationality : ''}</span>
                       <span className='birth-date'>{attributes['date-of-birth'] ? attributes['date-of-birth'] : ''}</span>
                       <span className='personal-number'>z e 184226 b</span>
                       <span className='sex'>{attributes.gender ? attributes.gender : ''}</span>
                       <span className='birth-place'>Zenith</span>
                       <span className='issue-date'>{attributes['issue-date'] ? attributes['issue-date'] : ''}</span>
                       <span className='authority'>{attributes['issuing-authority'] ? attributes['issuing-authority'] : ''}</span>
                       <span className='expiry-date'>{attributes['expiry-date'] ? attributes['expiry-date'] : ''}</span>
                       <span className='holder-signature'>Signature</span>
                      </div>
                   </div>  
                   </div> 
                </div>  
      )

      const formDisplay = (
        <div>
                 <div className="plane-row">
                  <div className="one-third-column">
                    <div className="title-center-text">
                      Boarding Pass Information
                    </div>
                  </div>
                  <div className="two-third-column"></div>
                </div>
                <div className="bar-row">
                  <span className="bold-bar-text">
                    Provide Additional Information:
                  </span>
                    <span className='bar-text'>
                      Guests supply details about their flight that are not contained
                      in their DTC credential
                    </span>
                </div>
                <div className='content-row content-text'>
                  <div className='one-third-column'>
                    <p>
                      Input your flight information and tap Submit to proceed
                    </p>
                  </div>
                  <div className='two-third-column'>
                  <FormContainer>

                    <FormWrapper>
                      <HeaderVerify>
                        Passport Details
                      </HeaderVerify>
                    </FormWrapper>
                    <Form>
                    <InputBox>
                      <ModalLabel>Type</ModalLabel>
                      <DataValue>{attributes['document-type'] ? attributes['document-type'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Country Code</ModalLabel>
                      <DataValue>UTO</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Passport Number</ModalLabel>
                      <DataValue>{attributes['document-number'] ? attributes['document-number'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Surname</ModalLabel>
                      <DataValue>{attributes['family-name'] ? attributes['family-name'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Given Names</ModalLabel>
                      <DataValue>{attributes['given-names'] ? attributes['given-names'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Nationality</ModalLabel>
                      <DataValue>{attributes.nationality ? attributes.nationality : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Date of Birth</ModalLabel>
                      <DataValue>{attributes['date-of-birth'] ? attributes['date-of-birth'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Personal Number</ModalLabel>
                      <DataValue>z e 184226 b</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Sex</ModalLabel>
                      <DataValue>{attributes.gender ? attributes.gender : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Place of Birth</ModalLabel>
                      <DataValue>Zenith</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Issue Date</ModalLabel>
                      <DataValue>{attributes['issue-date'] ? attributes['issue-date'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Authority</ModalLabel>
                      <DataValue>{attributes['issuing-authority'] ? attributes['issuing-authority'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Expiry Date</ModalLabel>
                      <DataValue>{attributes['expiry-date'] ? attributes['expiry-date'] : ''}</DataValue>
                    </InputBox>
                    <InputBox>
                      <ModalLabel>Signature</ModalLabel>
                      <DataValue>Signature</DataValue>
                    </InputBox>
                    </Form>
                  </FormContainer>
      
                  <Form id="form" onSubmit={handleSubmit} ref={newForm}>
                  <InputBox>
                  <ModalLabel>Hotel Details Sample Sets</ModalLabel>
                  <select 
                  onChange={(e) => selectOption(e.target.value)}
                  className="dropdown-content"
                  >
                    <option value='default'>Select Option:</option>
                    <option value='option_one'>Option 1</option>
                    <option value='option_two'>Option 2</option>
                  </select>
                  </InputBox>
                  <FormContainer>
                    <FormWrapper>
                    <HeaderVerify>
                      Guest 1
                    </HeaderVerify>
                    </FormWrapper>
                  <InputBox>
                        <ModalLabel htmlFor="one_title">Title</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_title"
                          defaultValue={hotelDetails.one_title}
                          ></InputFieldModal>
                      </InputBox>
                      
                      <InputBox>
                        <ModalLabel>Last Name</ModalLabel>
                        <DataValue>{attributes['family-name'] ? attributes['family-name'] : ''}</DataValue>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_first_name">First Name</ModalLabel>
                        <DataValue>{attributes['given-names'] ? attributes['given-names'] : ''}</DataValue>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_address">Address</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_address"
                          defaultValue={hotelDetails.one_address}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_city">City</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_city"
                          defaultValue={hotelDetails.one_city}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_postal_code">Postal Code</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_postal_code"
                          defaultValue={hotelDetails.one_postal_code}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_state">State</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_state"
                          defaultValue={hotelDetails.one_state}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_country">Country</ModalLabel>
                        <DataValue>{attributes.nationality ? attributes.nationality : ''}</DataValue>
                      </InputBox>

                      <InputBox>
                        <ModalLabel>Date of Birth</ModalLabel>
                        <DataValue>{attributes['date-of-birth'] ? attributes['date-of-birth'] : ''}</DataValue>
                      </InputBox>

                      <InputBox>
                        <ModalLabel>Place of Birth</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_place_of_birth"
                          defaultValue={hotelDetails.one_place_of_birth}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_email">Email</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_email"
                          defaultValue={hotelDetails.one_email}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_phone_number">Phone Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_phone_number"
                          defaultValue={hotelDetails.one_phone_number}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="one_departure_date">Anniversary Date</ModalLabel>
                        <InputFieldModal
                          type="date"
                          name="one_departure_date"
                          defaultValue={hotelDetails.one_anniversary_date}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Occasion</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="one_occasion"
                          defaultValue={hotelDetails.one_occasion}
                        ></InputFieldModal>
                      </InputBox>
                 
                  <FormWrapper>
                    <HeaderVerify>
                      Guest 2
                    </HeaderVerify>
                    </FormWrapper>
                      
                    <InputBox>
                        <ModalLabel htmlFor="traveler_phone">Title</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_title"
                          defaultValue={hotelDetails.two_title}
                        ></InputFieldModal>
                      </InputBox>
                      
                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Last Name</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_last_name"
                          defaultValue={hotelDetails.two_last_name}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">First Name</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_first_name"
                          defaultValue={hotelDetails.two_first_name}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Address</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_address"
                          defaultValue={hotelDetails.two_address}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">City</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_city"
                          defaultValue={hotelDetails.two_city}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Postal Code</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_postal_code"
                          defaultValue={hotelDetails.two_postal_code}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">State</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_state"
                          defaultValue={hotelDetails.two_state}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Country</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_country"
                          defaultValue={hotelDetails.two_country}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Date of Birth</ModalLabel>
                        <InputFieldModal
                          type="date"
                          name="two_date_of_birth"
                          defaultValue={hotelDetails.two_date_of_birth}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Place of Birth</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_place_of_birth"
                          defaultValue={hotelDetails.two_place_of_birth}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Email</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_email" 
                          defaultValue={hotelDetails.two_email}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Phone Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_phone_number"
                          defaultValue={hotelDetails.two_phone_number}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Anniversary Date</ModalLabel>
                        <InputFieldModal
                          type="date"
                          name="dwo_anniversary_date"
                          defaultValue={hotelDetails.two_anniversary_date}
                        ></InputFieldModal>
                      </InputBox>

                      <InputBox>
                        <ModalLabel htmlFor="traveler_email">Occasion</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="two_occasion"
                          defaultValue={hotelDetails.two_occasion}
                        ></InputFieldModal>
                      </InputBox>

                      <FormWrapper>
                    <HeaderVerify>
                      Hotel Details
                    </HeaderVerify>
                    </FormWrapper>

                      <InputBox>
                        <ModalLabel htmlFor="departure_airline">Repeat Guest</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="hotel_repeat_guest"
                          defaultValue={hotelDetails.hotel_repeat_guest}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_flight_number">Check-In Date</ModalLabel>
                        <InputFieldModal
                          type="date"
                          name="hotel_check_in_date"
                          defaultValue={hotelDetails.hotel_check_in_date}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_date">Check-Out Date</ModalLabel>
                        <InputFieldModal
                          type="date"
                          name="hotel_check_out_date"
                          defaultValue={hotelDetails.hotel_check_out_date}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_port_code">Arrival Date</ModalLabel>
                        <InputFieldModal
                          type="date"
                          name="hotel_arrival_date"
                          defaultValue={hotelDetails.hotel_arrival_date}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Arrival Flight</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="hotel_arrival_flight"
                          defaultValue={hotelDetails.hotel_arrival_flight}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Departure Date</ModalLabel>
                        <InputFieldModal
                          type="date"
                          name="hotel_departure_date"
                          defaultValue={hotelDetails.hotel_departure_date}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Departure Flight</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="hotel_departure_flight"
                          defaultValue={hotelDetails.hotel_departure_flight}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Notes</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="hotel_notes"
                          defaultValue={hotelDetails.hotel_notes}
                        ></InputFieldModal>
                      </InputBox>
                    </FormContainer>
                      <p className='text-center'><BtnLarge type="submit">Submit →</BtnLarge></p>
                      </Form>   
                  </div>
                  </div> 
                </div>
      )

      const successDisplay = (
        <div>
        <div className="plane-row">
          <div className="one-third-column">
            <div className="title-center-text">
              Success!
            </div>
          </div>
          <div className="two-third-column"></div>
        </div>
        <div className='content-row'>
          <div className='one-third-column'>
            <div className='content-text'>
              <p>
                Thank you, your reservation information was received.
              </p>
            </div>
            <div className='content-text'>
                You still need to come to the front desk, but your check-in process will be
                significantly faster because we already have the information you submitted.  
            </div>
          </div>
          </div>
       </div>
      )

      const invitationDisplay = (
        <div>
        <div className="plane-row">
          <div className="two-third-column">
            <div className="title-text">
              Welcome to the Boarding <br /> Pass Advanced Check-In
            </div>
            <div className="title-explain-text">
              Enjoy a seamless boarding pass check-in <br />
              process that eliminates all time waiting in line
            </div>
          </div>
          <div className="one-third-column"></div>
        </div>
        <div className="bar-row">
          <span className="bold-bar-text">
            Download and Passport Scan:
          </span>
            <span className='bar-text'>
              Travelers must have already downloaded the traveler
              mobile application onto their mobile device and
              received a DTC passport&nbsp;credential
            </span>
        </div>
        <div className='content-row'>
          <div className='one-third-column'>
            <div className='content-text'>
              Using the mobile app, open the camera and scan
              the QR code presented here:
            </div>
          </div>
          <div className='one-third-column'>
          <p>
                 <QR
                   value={invitation.invitation_url}
                   size={350}
                   renderAs="svg"
                 />
               </p>
          </div>
          <div className='one-third-column'></div>
          </div>
        </div>
      )

    return (
        <div> 
            {!errMessage ? (
            invitation && invitation.invitation_url && verificationComplete ? (    
                !toggleForm ? ( 
                passportDisplay
                ) : ( 
                  !formSubmitted ? (
                  formDisplay
                  ) : (
                   successDisplay
                  )
                    )
               ) : ( 
                invitationDisplay
               )
           ) : ( 
            formDisplay 

        //      <div> 
        //      <div className="plane-row">
        //            <div className="one-third-column">
        //              <div className="title-center-text">
        //                System Error
        //              </div>
        //            </div>
        //            <div className="two-third-column"></div>
        //          </div>
        //          <div className='content-row'>
        //            <div className='one-third-column'>
        //              <div className='content-text'>
        //                <p>We're sorry, but there was an error with your submission.</p>
        //              </div>
        //              <div className='content-text'>
        //                <p>You can still check-in, but you will need to visit the front desk at 
        //                  the Bucuti Resort. </p>
        //              </div>
        //            </div>
        //            </div>
        //  </div>
       )}        
    </div>
  )
}

export default TravelerForm
