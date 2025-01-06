import _ from 'lodash'

export const recipes = _.times(100, (i) => ({
  name: `Recipe name ${i}`,
  description: `Recipe ${i} description...`,
  id: String(i),
  text: _.times(
    100,
    (j) => `<p>Some text in paragraph ${j} about recipe ${i}</p>`,
  ).join(''),
}))
