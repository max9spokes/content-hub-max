import React, { useState, useEffect } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import SingleImage from "./SingleImage"
import css from "@emotion/css"
import BackToTheTop from "./BackToTheTop"

import { Collapse } from "reactstrap"
import InarticleTool from "./InarticleTool"

export default function SingleContent({ data: { article } }) {
  const { embededTools, expanderH2 } = article

  const options = {
    renderNode: {
      "embedded-entry-block": node => {
        console.log(node)

        const id = node.data.target.sys.id
        console.log("EMBEDED", id, embededTools[0])
        const tool = embededTools.filter(t => id.includes(t.contentful_id))[0]
        console.log(tool)

        return <InarticleTool tool={tool}></InarticleTool>
      },

      [BLOCKS.EMBEDDED_ASSET]: node => {
        const file =
          node.data &&
          node.data.target &&
          node.data.target.fields &&
          node.data.target.fields.file
        return file ? (
          <img
            className="d-block mr-3 my-2 m w-50 float-left"
            src={file["en-US"].url}
          />
        ) : (
          <></>
        )
      },

      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <blockquote
            css={css`
              font-size: 19px;
              font-weight: 600;
              line-height: 23px;
            `}
          >
            {children}
          </blockquote>
        )
      },
    },
  }
  const isFirstNodeH2 =
    article &&
    article.body &&
    article.body.json.content[0].nodeType === "heading-2"
  const INTRO = isFirstNodeH2
    ? article.body.json.content[0].content[0].value
    : null
  const CONTENT = article && article.body && article.body.json

  isFirstNodeH2 && CONTENT.content.shift()

  return (
    <>
      {article && (
        <section>
          <div className="container mt-2">
            {" "}
            <div className="row  ">
              {article.mediaThumb && (
                <div className="col col-12 col-md-6">
                  <SingleImage mediaThumb={article.mediaThumb} />
                </div>
              )}
              <div
                className={`col col-12 ${article.mediaThumb ? "col-md-6" : 0}`}
              >
                <h1
                  css={css`
                    font-size: 32px;
                    font-weight: bold;
                    line-height: 32px;
                    text-align: center;
                    color: var(--dark-font);
                    max-width: 80%;
                    margin: 2rem auto 1rem auto;
                  `}
                >
                  {article.title}
                </h1>
                <div
                  css={css`
                    color: #002e6b;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 15px;
                  `}
                >
                  {article.category}
                </div>
                <p
                  className="excerpt"
                  css={css`
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 17px;
                    text-align: center;
                    max-width: 80%;
                    margin: 2rem auto 1rem auto;
                  `}
                >
                  {INTRO}
                </p>
                <div
                  id="content"
                  className={"pb-4"}
                  css={css`
                    font-size: 16px;
                    line-height: 1.38;
                    p {
                      margin-bottom: 16px;
                    }
                    /* @md */
                    @media (min-width: 768px) {
                      font-size: 16px;
                      line-height: 1.38;
                      p {
                        margin-bottom: 16px;
                      }
                    }

                    h1 {
                      font-size: 35px;
                      letter-spacing: normal;
                      font-weight: bold;
                      line-height: 1.2;
                    }
                    h2 {
                      font-size: 28px;
                      letter-spacing: normal;
                      font-weight: semibold;
                      line-height: 1.2;
                    }

                    h3 {
                      font-size: 24px;
                      letter-spacing: normal;
                      font-weight: semibold;
                      line-height: 1.3;
                      margin-bottom: 1.5rem;
                    }
                    h4 {
                      font-size: 20px;
                      letter-spacing: normal;
                      font-weight: regular;
                      line-height: 1.45;
                      margin-bottom: 12px;
                    }
                    h5 {
                      font-size: 16px;
                      letter-spacing: normal;
                      font-weight: regular;
                      line-height: 1.45;
                      margin-bottom: 16px;
                    }
                    h6 {
                      font-size: 14px;
                      letter-spacing: normal;
                      font-weight: regular;
                      line-height: 1.38;
                      margin-bottom: 14px;
                    }

                    ul {
                      font-size: 16px;
                      letter-spacing: normal;
                      font-weight: regular;
                      line-height: 1.38;
                      margin-bottom: 16px;
                      list-style-type: disc;
                      padding-left: 20px;
                      padding-right: 10px;
                    }

                    ol {
                      font-size: 16px;
                      letter-spacing: normal;
                      font-weight: regular;
                      line-height: 1.38;
                      margin-bottom: 16px;
                      list-style-type: lower-alpha;
                      padding-left: 20px;
                      padding-right: 10px;
                    }

                    hr{
                      margin-top: 2.5rem;
                      margin-bottom: 1.5rem;
                    }
                  `}
                >
                  {!expanderH2 && documentToReactComponents(CONTENT, options)}
                  {expanderH2 && (
                    <Expanders content={CONTENT} options={options}></Expanders>
                  )}
                </div>
              </div>
            </div>
          </div>
          <BackToTheTop />
        </section>
      )}
    </>
  )
}

const Expanders = ({ content, options }) => {
  console.log(content)
  const [groups, setGroups] = useState(null)

  useEffect(() => {
    let index = 0
    let temp = []
    content.content.forEach(item => {
      if (item.nodeType !== "heading-2") {
        !temp[index] && temp.push([])
        temp[index].push(item)
      } else {
        index++
        !temp[index] && temp.push([])
        temp[index].push(item)
      }
    })
    let groupsBuilder = temp.map(group => {
      return {
        nodeType: "document",
        data: {},
        content: group,
      }
    })
    setGroups(groupsBuilder)
  }, [])

  return (
    <>
      {groups &&
        groups.map((g, i) => {
          if (g.content[0].nodeType == "heading-2") {
            return (
              <div key={i}>
                <ExpandersSection
                  group={g}
                  options={options}
                ></ExpandersSection>
              </div>
            )
          } else {
            return (
              <React.Fragment key={i}>
                {documentToReactComponents(g, options)}{" "}
              </React.Fragment>
            )
          }
        })}
    </>
  )
}

const ExpandersSection = ({ group, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const title = group.content[0]
  const content = {
    nodeType: "document",
    data: {},
    content: group.content.filter(i => {
      const isEmptyParagraph =
        i.content.length === 1 && i.content[0].value == ""

      return i.nodeType !== "heading-2" && !isEmptyParagraph
    }),
  }

  const data = documentToReactComponents(content, options)
  return (
    <>
      <hr></hr>
      <div
        css={css`
          cursor: pointer;
          display: flex;
          justify-content: space-between;
        `}
        onClick={e => {
          setIsOpen(o => !o)
        }}
      >
        {documentToReactComponents(
          {
            nodeType: "document",
            data: {},
            content: [title],
          },
          options
        )}
        <div
          css={css`
            svg {
              opacity: 0.7;
              transform: ${isOpen ? "rotate(0deg)" : "rotate(-180deg)"};
              transition: transform 300ms;
            }
          `}
        >
          {" "}
          <Arrow></Arrow>
        </div>
      </div>

      <Collapse isOpen={isOpen}>
        <div> {data}</div>
      </Collapse>
    </>
  )
}

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={25}
      height={25}
      style={{ fill: "#5a5a5a" }}
    >
      <path d="M 12 6.9296875 L 5.9296875 13 L 7.4296875 14.5 L 12 9.9296875 L 16.570312 14.5 L 18.070312 13 L 12 6.9296875 z" />
    </svg>
  )
}
