import {Request, Response} from "express";
import {prisma} from "../../prisma/client";

//every blog has a unique id also
//required fields for all blogs page - image, author, title, description, tags, createDate
//required fields for single blog page - success, status, message, data(related to that blog) -> id, authorImage, designation, seoDescription, dataOfPublish, updatedAt, title, category, description, isVisible, tags (array), likes

export const createBlog = async (req: Request, res: Response) => {
    const {
        title,
        description,
        content,
        image,
        author,
        authorImage,
        designation,
        seoDescription,
        category,
        tags,
        dataOfPublish,
    } = req.body.data;

    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                description,
                content,
                image,
                author,
                authorImage,
                designation,
                seoDescription,
                category,
                tags,
                dataOfPublish
            },
        });

        res.status(200).json({
            msg: "Created your blog",
            data: blog,
        });
    } catch (error: any) {
        res.status(404).send(`Error occurred, ${error}`);
    }
};


export const getAllBlogs = async (req: Request, res: Response) => {
    try{
        const blogs = await prisma.blog.findMany({});
        if(!blogs.length){
            res.json({
                msg: "no record found"
            })
        }
        res.json(blogs);
    }catch (error) {
        res.status(404).send(`Error occurred, ${error}`)
    }
}

export const getBlogById = async (req : Request, res : Response) => {
  try {
    console.log("reached here getBlogsById");
    const blogId: string = req.params.id;
    console.log(blogId);
    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        }
    })
    return res.status(200).json(blog);
  } catch (error) {
      res.status(404).send(`Error occurred, ${error}`)
  }
}