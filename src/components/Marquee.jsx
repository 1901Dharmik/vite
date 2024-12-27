// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';

// const Marquee = ({ children, speed = 50 }) => {
//   const controls = useAnimation();

//   useEffect(() => {
//     controls.start({
//       x: ['0%', '-100%'],
//       transition: {
//         repeat: Infinity,
//         repeatType: 'loop',
//         duration: speed,
//         ease: 'linear',
//       },
//     });
//   }, [controls, speed]);

//   return (
//     <div className="overflow-hidden whitespace-nowrap">
//       <motion.div
//         className="flex space-x-6 "
//         animate={controls}
//         onMouseEnter={() => controls.stop()}
//         onMouseLeave={() => controls.start({
//           x: ['0%', '-100%'],
//           transition: {
//             repeat: Infinity,
//             repeatType: 'loop',
//             duration: speed,
//             ease: 'linear',
//           },
//         })}
//       >
//         {children}
//         {children} {/* Duplicate the content to create the seamless effect */}
//       </motion.div>
//     </div>
//   );
// };

// export default Marquee;

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Marquee = ({ children, speed = 60 }) => {
  const controls = useAnimation();
  const [contentWidth, setContentWidth] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  useEffect(() => {
    const container = document.querySelector('.marquee-container');
    const content = document.querySelector('.marquee-content');
    
    setContainerWidth(container.offsetWidth);
    setContentWidth(content.offsetWidth);

    const duration = content.offsetWidth / speed;

    controls.start({
      x: [0, -content.offsetWidth],
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: duration,
        ease: 'linear',
      },
    });
  }, [controls, speed]);

  return (
    <div className="marquee-container overflow-hidden whitespace-nowrap">
      <motion.div
        className="marquee-content flex space-x-6"
        animate={controls}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start({
          x: [0, -contentWidth],
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: contentWidth / speed,
            ease: 'linear',
          },
        })}
      >
        {children}
         {children}
        {children} {/* Duplicate the content to create the seamless effect */}
      </motion.div>
    </div>
  );
};

export default Marquee;