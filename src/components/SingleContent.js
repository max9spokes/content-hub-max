import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SingleImage } from "./SingleImage"
import css from "@emotion/css"
export default function SingleContent() {
  const { main } = useStaticQuery(graphql`
    {
      main: file(name: { eq: "placeholder-main" }) {
        sharp: childImageSharp {
          fluid(maxHeight: 1600, maxWidth: 1800, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <section>
      <div className="container mt-2">
        {" "}
        <div className="row  ">
          <div className="col col-12 col-md-6">
            <SingleImage fluid={main.sharp.fluid} />
          </div>
          <div className="col col-12 col-md-6">
            <h1
              css={css`
                font-size: 32px;
                font-weight: bold;
                line-height: 32px;
                text-align: center;
                color: var(--dark-font);
                max-width: 410px;
                margin: 2rem auto 1rem auto;
              `}
            >
              Tips from a veteran of the service industry
            </h1>
            <div
              css={css`
                color: #002e6b;
                text-align: center;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: 600;
                line-height: 15px;
              `}
            >
              Business tips
            </div>
            <p
              className="excerpt"
              css={css`
                font-size: 14px;
                font-weight: 600;
                line-height: 17px;
                text-align: center;
                max-width: 410px;
                margin: 2rem auto 1rem auto;
              `}
            >
              Dreams are important. Not the dreams you have when sleeping. I’m
              talking about the dreams you have for your future — the dreams
              that make each day worth living.
            </p>
            <div
              id="content"
              css={css`
                font-size: 14px;
                line-height: 18px;
              `}
            >
              <p>
                Recently I came across an exciting video on the internet. The
                video was packed with information about marketing and how
                cooperation between the owners of businesses in the same
                industry can do a great deal more for one another and in effect
                for themselves, than they could hope to do for themselves if
                they consider others in their industry to be competitors. This
                concept, that there is no competition in your industry, gives
                you a tremendous leverage in business. Results from the effort
                of one person are more than doubled when a second person joins
                the first person. Consider the following scenario; it should
                serve to give you a clear understanding of how results are
                multiplied through cooperation. When working on hydraulic test
                stands a single person working alone would spend considerable
                time having to run piping through a large wall,walking from one
                side of the wall, to the end of that wall and around to the
                other side of the wall to a specific point along the wall to
                connect the piping he/she just ran through the wall to a testing
                station. Then once the testing was complete the person would
                have to return to the other side of the wall and repeat the
                process at a different point in the wall. When two people are
                working in cooperation, each can stand on opposite sides of the
                wall and run piping through the wall to be immediately connected
                and tested on the other side of the wall. In addition, while the
                testing is taking place by one of the people, the other person
                would simultaneously begin running piping through the wall at
                the next point in the wall. The two people would continue doing
                so, along the full length of the wall, thereby increasing the
                results by more than double. So as can be seen here, cooperation
                instead of competition can go a long way to place each
                individual far ahead of where he/she would be by merely “going
                it” alone. And in the midst of the harmony of cooperation,
                people enjoy an extra reward of happiness that those who are
                selfish or greedy can never feel. I hope this article serves to
                increase results for you.
              </p>
              <p>
                Recently I came across an exciting video on the internet. The
                video was packed with information about marketing and how
                cooperation between the owners of businesses in the same
                industry can do a great deal more for one another and in effect
                for themselves, than they could hope to do for themselves if
                they consider others in their industry to be competitors. This
                concept, that there is no competition in your industry, gives
                you a tremendous leverage in business. Results from the effort
                of one person are more than doubled when a second person joins
                the first person. Consider the following scenario; it should
                serve to give you a clear understanding of how results are
                multiplied through cooperation. When working on hydraulic test
                stands a single person working alone would spend considerable
                time having to run piping through a large wall,walking from one
                side of the wall, to the end of that wall and around to the
                other side of the wall to a specific point along the wall to
                connect the piping he/she just ran through the wall to a testing
                station. Then once the testing was complete the person would
                have to return to the other side of the wall and repeat the
                process at a different point in the wall. When two people are
                working in cooperation, each can stand on opposite sides of the
                wall and run piping through the wall to be immediately connected
                and tested on the other side of the wall. In addition, while the
                testing is taking place by one of the people, the other person
                would simultaneously begin running piping through the wall at
                the next point in the wall. The two people would continue doing
                so, along the full length of the wall, thereby increasing the
                results by more than double. So as can be seen here, cooperation
                instead of competition can go a long way to place each
                individual far ahead of where he/she would be by merely “going
                it” alone. And in the midst of the harmony of cooperation,
                people enjoy an extra reward of happiness that those who are
                selfish or greedy can never feel. I hope this article serves to
                increase results for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
