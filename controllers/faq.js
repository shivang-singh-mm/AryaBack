const Faq = require('../models/Faq');
require('../controllers/slide');

const getAllFaqs = async (req, res) => {
    const faqs = await Faq.find();
    return res.status(200).json(faqs);
}

const getSingleFaq = async (req, res) => {
    const { id: faqID } = req.params;
    const faq = await Faq.findOne({ _id: faqID });

    if (!faq) {
        return res.status(404).json({ msg: `No faq with id: ${faqID}` });
    }

    return res.status(201).json(faq);
}


const createFaq = async (req, res) => {
    try {
        // req.body.createdBy = req.user.userId; 
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(401).send("Please fill the missing fields");
        }


        const faq = await Faq.create({ ...req.body });
        return res.status(201).json(faq);
    } catch (error) {
        console.log(error);
    }

}


const updateFaq = async (req, res) => {
    try {
        const { id: faqID } = req.params;
        const currentFaq = await Faq.findById({ _id: faqID });

        const faq = await Faq.findOneAndUpdate({ _id: faqID }, req.body, {
            new: true,
            // runValidators:true,
        });

        if (!faq) {
            return res.status(404).json({ msg: `No task with id : ${faqID}` });
        }

        return res.status(200).json(faq);
    } catch (error) {
        console.log(error);
    }
}

const deleteFaq = async (req, res) => {
    const { id: faqID } = req.params;
    const faq = await Faq.findById({ _id: faqID });
    if (!faq) {
        return res.status(404).json({ msg: `No faq with id: ${faqID}` });
    }

    await Faq.findByIdAndDelete({ _id: faqID });
    return res.status(200).json(faq);
}

module.exports = {
    getAllFaqs,
    updateFaq,
    deleteFaq,
    createFaq,
    getSingleFaq
}
