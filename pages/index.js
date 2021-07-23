import {createClient} from "contentful"
import RecipeCard from "../components/RecipeCard"

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const res = await client.getEntries({content_type: 'recipe'})

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1 //最多1s访问页面的用户是否可以重新验证
  }
}

export default function Recipes({recipes}) {
  console.log(recipes)
  return (
    <div className="recipe-list">
      {recipes.map(recipe=>(
        <RecipeCard key={recipe.sys.id} recipe={recipe}></RecipeCard>
      ))}
      <style jsx>{`
        .recipe-list{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}