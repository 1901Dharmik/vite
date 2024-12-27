import React from 'react'

const NotUsed = () => {
  return (
    <div>    <Container className="problem-to-cure">
    <div className=" mx-auto px-4 py-8 bg-gray-50">
      <Tittle
        name="Problem To Cure"
        head="Select Wide Range Of Ayurvedic Products"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        <div className="flex flex-col items-start">
          <img
            src="https://sajivanayurveda.in/wp-content/uploads/2023/01/stomach-gas-transformed-1-e1673515265669.jpeg"
            alt="Joint Pain Illustration"
            // width={300}
            // height={200}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">
            Joint Pain
          </h2>
          <p className="text-gray-600">
            It helps to relieve any kind of joint pain due to
            injuries or growing age effectively without any side
            effects naturally.
          </p>
        </div>

        <div className="flex flex-col items-start">
          <img
            src="https://sajivanayurveda.in/wp-content/uploads/2023/01/stomach-gas-transformed-1-e1673515265669.jpeg"
            alt="Muscle Pain Illustration"
            // width={300}
            // height={200}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">
            Muscle Pain
          </h2>
          <p className="text-gray-600">
            It is effective in treating muscle pain that occurs
            as a result of injuries and provides long lasting
            relief from the discomfort.
          </p>
        </div>

        <div className="flex flex-col items-start">
          <img
            src="https://sajivanayurveda.in/wp-content/uploads/2023/01/stomach-gas-transformed-1-e1673515265669.jpeg"
            alt="Relieve Discomfort Illustration"
            // width={300}
            // height={200}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">
            Relieve Discomfort
          </h2>
          <p className="text-gray-600">
            It is a pure ayurvedic formula that helps to relieve
            discomfort caused by pains for a side-effect free
            long lasting relief.
          </p>
        </div>
      </div>
    </div>
  </Container></div>
  )
}

export default NotUsed