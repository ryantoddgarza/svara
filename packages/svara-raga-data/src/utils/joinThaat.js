import { thaats } from '../data';

function joinThaat(obj) {
  return {
    ...obj,
    thaat: {
      name: obj.thaat,
      set: thaats[obj.thaat],
    },
  };
}

export default joinThaat;
