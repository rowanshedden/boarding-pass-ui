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
  const [boardingPassDetails, setBoardingPassDetails] = useState({})

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
            setBoardingPassDetails({
              passenger_given_names: 'John',
              passenger_family_names: 'Doe',
              passenger_image: 'blank', 
              airline_alliance: 'Sky Team', 
              passenger_tsa_precheck: 'Yes',
              booking_reference_number: '55589', 
              ticket_eticket_number: '109420123',
              ticket_designated_carrier: 'Delta',
              ticket_operating_carrier: 'Spirit Air',
              ticket_flight_number: '15294',
              ticket_class: 'Economy',
              ticket_seat_number: '15B',
              ticket_exit_row: 'No',
              ticket_origin: 'USA',
              ticket_destination: 'France',
              ticket_special_service_request: 'No', 
              ticket_with_infant: 'Yes',
              ticket_luggage: 'Yes', 
              boarding_gate: '54',
              boarding_zone_group: '1', 
              boarding_secondary_screening: 'No', 
              boarding_date_time: '23:31:00', 
              boarding_departure_date_time: '19:05:00', 
              boarding_arrival_date_time: '08:35:00', 
              frequent_flyer_airline: 'American',
              frequent_flyer_number: '9080',
              frequent_flyer_status: 'Silver',
            })
  
          break;
          
          case 'option_two':
            console.log(option)
            setBoardingPassDetails({
              passenger_given_names: 'Jill',
              passenger_family_names: 'Cassidy',
              passenger_image: 'blank', 
              airline_alliance: 'Star Alliance', 
              passenger_tsa_precheck: 'Yes',
              booking_reference_number: '7778', 
              ticket_eticket_number: '7240182',
              ticket_designated_carrier: 'Asiana',
              ticket_operating_carrier: 'Singapore Air',
              ticket_flight_number: '155112',
              ticket_class: 'First Class',
              ticket_seat_number: '55A',
              ticket_exit_row: 'No',
              ticket_origin: 'England',
              ticket_destination: 'Thailand',
              ticket_special_service_request: 'No', 
              ticket_with_infant: 'Yes',
              ticket_luggage: 'Yes', 
              boarding_gate: '14',
              boarding_zone_group: '3', 
              boarding_secondary_screening: 'Yes', 
              boarding_date_time: '00:23:00', 
              boarding_departure_date_time: '12:48:00', 
              boarding_arrival_date_time: '04:33:00', 
              frequent_flyer_airline: 'Alaska',
              frequent_flyer_number: '874412',
              frequent_flyer_status: 'Gold',
            })

            break;

          default:
            setBoardingPassDetails({
              passenger_given_names: '',
              passenger_family_names: '',
              passenger_image: '', 
              airline_alliance: '', 
              passenger_tsa_precheck: '',
              booking_reference_number: '', 
              ticket_eticket_number: '',
              ticket_designated_carrier: '',
              ticket_operating_carrier: '',
              ticket_flight_number: '',
              ticket_class: '',
              ticket_seat_number: '',
              ticket_exit_row: '',
              ticket_origin: '',
              ticket_destination: '',
              ticket_special_service_request: '', 
              ticket_with_infant: '',
              ticket_luggage: '', 
              boarding_gate: '',
              boarding_zone_group: '', 
              boarding_secondary_screening: '', 
              boarding_date_time: '', 
              boarding_departure_date_time: '', 
              boarding_arrival_date_time: '', 
              frequent_flyer_airline: '',
              frequent_flyer_number: '',
              frequent_flyer_status: '',
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
                  <ModalLabel>Boarding Pass Sample Sets</ModalLabel>
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
                      Boarding Pass Details
                    </HeaderVerify>
                  </FormWrapper>

                      <InputBox>
                        <ModalLabel htmlFor="departure_airline">Given Name</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_given_names"
                          defaultValue={boardingPassDetails.passenger_given_names}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_flight_number">Family Name</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_family_names"
                          defaultValue={boardingPassDetails.passenger_family_names}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_date">Image</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_image"
                          defaultValue={boardingPassDetails.passenger_image}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_port_code">Airline Alliance</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="airline_alliance"
                          defaultValue={boardingPassDetails.airline_alliance}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">TSA Precheck</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_tsa_precheck"
                          defaultValue={boardingPassDetails.passenger_tsa_precheck}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Booking Reference Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="booking_reference_number"
                          defaultValue={boardingPassDetails.booking_reference_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Eticket Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_eticket_number"
                          defaultValue={boardingPassDetails.ticket_eticket_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Designated Carrier</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_designated_carrier"
                          defaultValue={boardingPassDetails.ticket_designated_carrier}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Operating Carrier</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_operating_carrier"
                          defaultValue={boardingPassDetails.ticket_operating_carrier}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Flight Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_flight_number"
                          defaultValue={boardingPassDetails.ticket_flight_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Class</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_class"
                          defaultValue={boardingPassDetails.ticket_class}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Seat Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_seat_number"
                          defaultValue={boardingPassDetails.ticket_seat_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Exit Row</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_exit_row"
                          defaultValue={boardingPassDetails.ticket_exit_row}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Origin</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_origin"
                          defaultValue={boardingPassDetails.ticket_origin}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Destination</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_destination"
                          defaultValue={boardingPassDetails.ticket_destination}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Special Service Request</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_special_service_request"
                          defaultValue={boardingPassDetails.ticket_special_service_request}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Infant Accomodations</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_with_infant"
                          defaultValue={boardingPassDetails.ticket_with_infant}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Luggage</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_luggage"
                          defaultValue={boardingPassDetails.ticket_luggage}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Gate</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="boarding_gate"
                          defaultValue={boardingPassDetails.boarding_gate}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Zone Group</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="boarding_zone_group"
                          defaultValue={boardingPassDetails.boarding_zone_group}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Secondary Screening</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="boarding_secondary_screening"
                          defaultValue={boardingPassDetails.boarding_secondary_screening}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Boarding Time</ModalLabel>
                        <InputFieldModal
                          type="time"
                          name="boarding_date_time"
                          defaultValue={boardingPassDetails.boarding_date_time}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Departure Time</ModalLabel>
                        <InputFieldModal
                          type="time"
                          name="boarding_departure_date_time"
                          defaultValue={boardingPassDetails.boarding_departure_date_time}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Arrival Time</ModalLabel>
                        <InputFieldModal
                          type="time"
                          name="boarding_arrival_date_time"
                          defaultValue={boardingPassDetails.boarding_arrival_date_time}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Frequent Flyer Airline</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="frequent_flyer_airline"
                          defaultValue={boardingPassDetails.frequent_flyer_airline}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Frequent Flyer Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="frequent_flyer_number"
                          defaultValue={boardingPassDetails.frequent_flyer_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="departure_destination_country_code">Frequent Flyer Status</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="frequent_flyer_status"
                          defaultValue={boardingPassDetails.frequent_flyer_status}
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
