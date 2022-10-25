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
  const [verificationComplete, setVerificationComplete] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [verification, setVerification] = useState({})
  const [errMessage, setErrMessage] = useState('')
  const [toggleForm, setToggleForm] = useState(true)
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
        const verificationRecords = verRes.data.verificationRecords
        setVerificationComplete(true)
      
        console.log('Verification:', verRes)

        let verifiedAttributes = {}
        verificationRecords.forEach((record) => {
          record.result_data.forEach((attributes, index) => {
            verifiedAttributes[attributes.name] = attributes.value
          })
        })
        
        setVerification({connectionId: verificationRecords[0].connection_id, verifiedAttributes: verifiedAttributes})
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
        const credentialData = {
          passenger_given_names: verification.verifiedAttributes['given-names'],
          frequent_flyer_status: form.get("frequent_flyer_status"),
          passenger_family_names: verification.verifiedAttributes['family-names'],
          boarding_arrival_date_time: form.get("boarding_arrival_date_time"),
          boarding_gate: form.get("boarding_gate"),
          ticket_exit_row: form.get("ticket_exit_row*"),
          ticket_origin: form.get("ticket_origin"),
          frequent_flyer_airline: form.get("frequent_flyer_airline"),
          ticket_eticket_number: form.get("ticket_eticket_number"),
          frequent_flyer_number: form.get("frequent_flyer_number"),
          passenger_tsa_precheck: form.get("passenger_tsa_precheck"),
          boarding_secondary_screening: form.get("boarding_secondary_screening"),
          ticket_flight_number: form.get("ticket_flight_number"),
          ticket_destination: form.get("ticket_destination"),
          ticket_designated_carrier: form.get("ticket_designated_carrier"),
          boarding_zone_group: form.get("boarding_zone_group"),
          ticket_operating_carrier: form.get("ticket_operating_carrier"),
          boarding_departure_date_time: form.get("boarding_departure_date_time"),
          ticket_special_service_request: form.get("ticket_special_service_request"),
          booking_reference_number: form.get("booking_reference_number"),
          airline_alliance: form.get("airline_alliance"),
          ticket_with_infant: form.get("ticket_with_infant"),
          ticket_seat_number: form.get("ticket_seat_number"),
          passenger_image: form.get("passenger_image"),
          boarding_date_time: form.get("boarding_date_time"),
          ticket_class: form.get("ticket_class"),
          }

          Axios({
            method: 'POST',
            url: `/api/credentials/`,
            data: {
              credentialData: credentialData, 
              connectionId: verification.connectionId
            }
          }).then(() => {
            setFormSubmitted(true)
          }).catch(err => {
            console.error('Error: ', err)
            if (err.response.data.message) {
              setErrMessage(err.response.data.message)
            }
          })
      }

      const selectOption = (option) => {
        switch(option) {
          case 'option_one':
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
              ticket_flight_number: 'DA152',
              ticket_class: 'Economy',
              ticket_seat_number: '15B',
              ticket_exit_row: 'No',
              ticket_origin: 'LAX',
              ticket_destination: 'CDG',
              ticket_special_service_request: 'None', 
              ticket_with_infant: 'Yes',
              ticket_luggage: '2pc', 
              boarding_gate: 'A54',
              boarding_zone_group: '1', 
              boarding_secondary_screening: 'No', 
              boarding_date_time: '2022-10-15T08:30', 
              boarding_departure_date_time: '2022-10-15T10:30', 
              boarding_arrival_date_time: '2022-10-23T17:52', 
              frequent_flyer_airline: 'American Airlines',
              frequent_flyer_number: '9080',
              frequent_flyer_status: 'Silver',
            })
  
          break;
          
          case 'option_two':
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
              ticket_flight_number: 'AS155',
              ticket_class: 'First Class',
              ticket_seat_number: '55A',
              ticket_exit_row: 'No',
              ticket_origin: 'LHR',
              ticket_destination: 'BKK',
              ticket_special_service_request: 'None',
              ticket_with_infant: 'Yes',
              ticket_luggage: '2pc', 
              boarding_gate: 'A14',
              boarding_zone_group: '3', 
              boarding_secondary_screening: 'Yes', 
              boarding_date_time: '2022-10-15T08:30', 
              boarding_departure_date_time: '2022-10-15T10:30', 
              boarding_arrival_date_time: '2022-10-23T17:52', 
              frequent_flyer_airline: 'Alaska Airlines',
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
                      Travelers receive confirmation that their DTC and Trusted Traveler credential details were successfully received by the system
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
                      in their DTC or Trusted Traveler credential 
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
                        <ModalLabel htmlFor="passenger_given_names">Given Name</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_given_names"
                          defaultValue={verification.verifiedAttributes['given-names']}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="passenger_family_names">Family Name</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_family_names"
                          defaultValue={verification.verifiedAttributes['family-name']}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="passenger_image">Image</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_image"
                          defaultValue={verification.verifiedAttributes['chip-photo']}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="airline_alliance">Airline Alliance</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="airline_alliance"
                          defaultValue={boardingPassDetails.airline_alliance}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="passenger_tsa_precheck">TSA Precheck</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="passenger_tsa_precheck"
                          defaultValue={boardingPassDetails.passenger_tsa_precheck}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="booking_reference_number">Booking Reference Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="booking_reference_number"
                          defaultValue={boardingPassDetails.booking_reference_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_eticket_number">Eticket Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_eticket_number"
                          defaultValue={boardingPassDetails.ticket_eticket_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_designated_carrier">Designated Carrier</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_designated_carrier"
                          defaultValue={boardingPassDetails.ticket_designated_carrier}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_operating_carrier">Operating Carrier</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_operating_carrier"
                          defaultValue={boardingPassDetails.ticket_operating_carrier}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_flight_number">Flight Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_flight_number"
                          defaultValue={boardingPassDetails.ticket_flight_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_class">Class</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_class"
                          defaultValue={boardingPassDetails.ticket_class}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_seat_number">Seat Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_seat_number"
                          defaultValue={boardingPassDetails.ticket_seat_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_exit_row">Exit Row</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_exit_row"
                          defaultValue={boardingPassDetails.ticket_exit_row}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_origin">Origin</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_origin"
                          defaultValue={boardingPassDetails.ticket_origin}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_destination">Destination</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_destination"
                          defaultValue={boardingPassDetails.ticket_destination}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_special_service_request">Special Service Request</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_special_service_request"
                          defaultValue={boardingPassDetails.ticket_special_service_request}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_with_infant">Infant Accomdations</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_with_infant"
                          defaultValue={boardingPassDetails.ticket_with_infant}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="ticket_luggage">Luggage</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="ticket_luggage"
                          defaultValue={boardingPassDetails.ticket_luggage}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="boarding_gate">Gate</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="boarding_gate"
                          defaultValue={boardingPassDetails.boarding_gate}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="boarding_zone_group">Zone Group</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="boarding_zone_group"
                          defaultValue={boardingPassDetails.boarding_zone_group}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="boarding_secondary_screening">Secondary Screening</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="boarding_secondary_screening"
                          defaultValue={boardingPassDetails.boarding_secondary_screening}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="boarding_date_time">Boarding Date and Time</ModalLabel>
                        <InputFieldModal
                          type="datetime-local"
                          name="boarding_date_time"
                          defaultValue={boardingPassDetails.boarding_date_time}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="boarding_departure_date_time">Departure Date and Time</ModalLabel>
                        <InputFieldModal
                          type="datetime-local"
                          name="boarding_departure_date_time"
                          defaultValue={boardingPassDetails.boarding_departure_date_time}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="boarding_arrival_date_time">Arrival Date and Time</ModalLabel>
                        <InputFieldModal
                          type="datetime-local"
                          name="boarding_arrival_date_time"
                          defaultValue={boardingPassDetails.boarding_arrival_date_time}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="frequent_flyer_airline">Frequent Flyer Airline</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="frequent_flyer_airline"
                          defaultValue={boardingPassDetails.frequent_flyer_airline}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="frequent_flyer_number">Frequent Flyer Number</ModalLabel>
                        <InputFieldModal
                          type="text"
                          name="frequent_flyer_number"
                          defaultValue={boardingPassDetails.frequent_flyer_number}
                        ></InputFieldModal>
                      </InputBox>
                      <InputBox>
                        <ModalLabel htmlFor="frequent_flyer_status">Frequent Flyer Status</ModalLabel>
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
                Thank you, your boarding pass is in process for approval.
              </p>
            </div>
            <div className='content-text'>
                If approved, you should receive a boarding pass credential offer
                on your mobile device shortly.  
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
              received a DTC passport and Trusted Traveler&nbsp;credential
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
            {console.log(verification)}
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
