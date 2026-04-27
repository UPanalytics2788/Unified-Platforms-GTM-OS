import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, writeBatch, doc } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const newService = {
    id: "content-strategy",
    title: "Content Strategy Services",
    slug: "content-strategy",
    primary_keyword: "Content Strategy Services",
    meta_title: "Content Strategy Services | GTM OS",
    meta_description: "Build a content strategy that aligns with your business goals, serves your audience, and drives measurable growth. GTM OS develops content strategies that work across SEO, social, and paid channels.",
    description: "Build a content strategy that aligns with your business goals, serves your audience, and drives measurable growth. We develop content strategies that work across SEO, social, and paid channels.",
    primary_cta_text: "Get Content Strategy",
    secondary_cta_text: "View Framework",
    use_cases: [
      "Businesses starting their content marketing program",
      "Established companies whose content output lacks coherence",
      "Organizations entering new markets or launching new products",
      "Businesses going through a rebrand or repositioning"
    ],
    faqs: [
      {
        question: "How is a content strategy different from a content calendar?",
        answer: "A content calendar is a scheduling tool that tells you what to publish and when. A content strategy is the plan that determines why those topics, for which audiences, through which channels, and toward what goals. Both are needed, and the calendar should be derived from and governed by the strategy rather than existing independently of it."
      },
      {
        question: "How long does it take to develop a content strategy?",
        answer: "A thorough content strategy development engagement typically takes four to six weeks, depending on the complexity of your business, the number of audience segments, the size of your existing content library, and the depth of audience research required. Simpler engagements with a narrow focus can be completed in two to three weeks."
      },
      {
        question: "We already have a marketing team. Where does a content strategy agency fit in?",
        answer: "Content strategy consulting typically works best as either a foundational project that gives your internal team a clear plan to execute against, or as an ongoing advisory engagement where we work alongside your team to refine direction based on performance data. We provide that layer without replacing your team."
      },
      {
        question: "How do you approach content strategy for businesses with multiple products or services?",
        answer: "We structure content strategy for these businesses around clear topic cluster separation, audience-specific content hubs, and navigation architecture that helps different visitor types find the content most relevant to them quickly. The strategy also defines how content investments are prioritized across product lines."
      },
      {
        question: "Can you develop content strategy for a specific channel only, like SEO content or social media?",
        answer: "Yes. While we believe the most effective content strategies take an integrated view across channels, we regularly develop channel-specific content strategies for clients who have clear channel priorities or who want to improve performance in one area before expanding."
      },
      {
        question: "How often should a content strategy be reviewed and updated?",
        answer: "We recommend a formal content strategy review every six to twelve months, with lighter quarterly performance reviews in between. The formal review assesses whether the core strategic direction remains sound based on performance data, audience changes, competitive shifts, and business priority evolution."
      },
      {
        question: "What deliverables do we get at the end of a content strategy engagement?",
        answer: "Standard deliverables include an audience persona documentation set, a content audit report for existing content, a channel and format strategy document, a topic and keyword map for SEO-oriented content, an editorial calendar for the first three to six months, brand voice and tone guidelines, a measurement framework with defined KPIs, and a content governance framework."
      }
    ],
    content: `
      <h2>Content Strategy Services That Give Your Marketing a Direction Worth Following</h2>
      <p>Most businesses produce content without a content strategy. They publish blog posts when someone has time, push social updates when they remember, and create landing pages when campaigns demand them. The result is a fragmented content library that does not build on itself, does not serve a clear audience journey, and does not compound into business value over time.</p>
      <p>A content strategy changes that. It is the plan that determines what content you create, for whom, through which channels, at what frequency, and toward what measurable goals. It connects every piece of content to a business outcome and ensures that effort invested in content today builds something durable rather than disappearing into the noise.</p>
      <p>At GTM OS, we develop content strategies for businesses that want their content to work as a genuine growth channel, not just as a box to check on the marketing to-do list.</p>

      <h3>What a Content Strategy Actually Is</h3>
      <p>A content strategy is a documented plan that defines the purpose of your content, the audiences it serves, the topics and formats it will cover, the channels it will be distributed through, and the metrics that will determine whether it is working. It is the connective tissue between your business objectives and the day-to-day content production decisions your team makes.</p>
      <p>Without a strategy, those daily decisions are made in isolation based on whoever has time, whatever feels relevant that week, or what your competitors appear to be doing. With a strategy, every decision has context. Editors know which topics to prioritize. Writers know which audience segments to write for and at what stage of the buying journey. Designers know what visual formats serve which content goals. And leadership can evaluate content investment against defined business outcomes rather than approximate effort.</p>
      <p>A content strategy is also a living document. Markets change, audiences evolve, and business priorities shift. A strategy that was right twelve months ago may need updating based on what the performance data has revealed and what the market landscape looks like today.</p>

      <h3>Who Needs a Content Strategy</h3>
      <p>Content strategy work is relevant for several distinct situations:</p>
      <ul>
        <li>Businesses starting their content marketing program who want to build on a solid foundation rather than learning from two years of misdirected effort</li>
        <li>Established companies whose content output has grown organically over time without a clear plan and now lacks coherence, brand consistency, or measurable results</li>
        <li>Organizations entering new markets or launching new products who need a content plan that speaks to a different audience segment than the one they have been serving</li>
        <li>Businesses going through a rebrand or repositioning that need their content to reflect and reinforce a new brand narrative</li>
        <li>Marketing teams that have been executing content but lack confidence in whether the investment is generating meaningful return</li>
      </ul>

      <h3>Our Content Strategy Development Process</h3>

      <h4>Business Objectives and Content Goals Alignment</h4>
      <p>We begin by understanding what your business is trying to achieve and where content fits in that picture. Revenue targets, customer acquisition goals, retention objectives, market positioning priorities, and competitive pressures all shape what a content strategy should be designed to do. Content strategy built without this context produces plans that sound thorough but do not connect to anything that matters to the business.</p>
      <p>We map specific content goals to each business objective, defining what success looks like at the content level and how it translates to business outcomes. This gives stakeholders a shared understanding of what the content program is for and makes evaluation of results straightforward.</p>

      <h4>Audience Research and Persona Development</h4>
      <p>Content that tries to speak to everyone ends up resonating with no one. Effective content strategy starts with a clear, research-based understanding of the specific audience segments you are trying to reach, what they care about, what questions they are trying to answer, where they go for information, what content formats they engage with, and where they are in their relationship with your brand.</p>
      <p>We develop audience personas grounded in real data rather than assumptions. This includes analysis of your existing customer base, interviews or surveys with target customers where possible, search behavior data that reveals what your audience is looking for, and competitive content analysis that reveals what is already resonating in your space. The personas that come out of this process become the filter through which every content decision passes.</p>

      <h4>Content Audit</h4>
      <p>For businesses with an existing content library, a content audit is an essential step before building a new strategy. The audit takes stock of what you already have, evaluates it against your target audience needs and business goals, identifies which existing content is performing well and should be built upon, and flags content that is outdated, underperforming, or misaligned with your current positioning.</p>
      <p>The audit typically produces three categories of existing content: assets worth keeping and promoting, assets worth updating and improving, and content that should be retired or consolidated. This triage ensures you are not duplicating effort on topics already covered well and not ignoring valuable existing assets that could be refreshed and reactivated.</p>

      <h4>Channel Strategy and Content Mix</h4>
      <p>Different content formats serve different purposes and perform differently across channels. Long-form articles build SEO authority and serve information-seeking audiences. Social content builds community and drives brand awareness. Email nurtures existing leads and retains customers. Video demonstrates product value and humanizes brands. Case studies and whitepapers serve later-stage buyers conducting due diligence.</p>
      <p>We define which channels your content strategy will prioritize based on where your target audience spends time, which formats your team can produce consistently and well, and which channels align with your business objectives. A content strategy that tries to cover every channel simultaneously with a small team is a plan for mediocrity across the board. We build strategies that focus resources on the channels with the highest potential return and expand from there as capacity grows.</p>

      <h4>Editorial Calendar and Content Roadmap</h4>
      <p>A content strategy that does not include a production plan is an incomplete document. We translate the strategy into a practical editorial calendar that defines what to publish, when, on which channels, and who is responsible for producing it. The calendar is built around your team capacity, seasonal demand patterns, product launch timelines, and the content gaps identified during the audit phase.</p>
      <p>The roadmap also sequences content production to build topic clusters systematically rather than publishing in arbitrary order. Pillar content that establishes authority on core topics is prioritized before cluster content that supports it, ensuring the internal linking architecture develops coherently as new content is published.</p>

      <h4>Content Governance and Brand Voice Guidelines</h4>
      <p>As content programs scale, consistency becomes a challenge. Different writers, different channels, and different team members produce content in different ways unless there are clear guidelines in place. We develop content governance frameworks that define your brand voice and tone, editorial standards, fact-checking and approval workflows, content formatting requirements, and guidelines for how different content types should be structured.</p>
      <p>These guidelines reduce production friction, improve consistency, and make it possible to onboard new writers or content partners without sacrificing quality or brand coherence.</p>

      <h4>Measurement Framework and KPI Definition</h4>
      <p>We define the metrics that will be used to evaluate content performance at each level: individual piece performance, channel-level performance, and overall program performance against business objectives. This includes both leading indicators like traffic, engagement, and share of voice, and lagging indicators like lead volume, customer acquisition, and revenue attribution.</p>
      <p>Measurement frameworks are set up before content production begins so that baseline data is available from day one and progress can be tracked consistently over time.</p>

      <h4>Content Strategy and Distribution</h4>
      <p>Creating content is only half the job. A piece of content that is published and never actively distributed reaches a fraction of its potential audience. We build distribution plans into every content strategy, defining how each piece of content will be promoted across owned channels like email and social, earned channels like outreach and PR, and paid channels like content amplification campaigns. Distribution planning is what separates content programs that build real audiences from those that publish into the void.</p>

      <h4>Measuring Content Strategy Success</h4>
      <p>Content strategy performance is measured across multiple timeframes. In the short term, we track publishing cadence adherence, content quality metrics, and early engagement signals. Over the medium term, we measure organic traffic growth, keyword ranking improvements, lead generation from content, and email subscriber growth. Over the longer term, we evaluate revenue attribution, customer lifetime value differences between content-acquired and other customers, and brand authority signals like share of voice and unsolicited media mentions.</p>
      <p>Quarterly strategy reviews assess whether the direction is producing the expected results and whether any adjustments are needed based on performance data or market changes.</p>

      <p>Ready to give your content a direction that drives real business outcomes? Contact GTM OS to start your content strategy engagement.</p>
    `
};

async function addService() {
  const q = query(collection(db, 'services'), where('slug', '==', 'content-strategy'));
  const snap = await getDocs(q);
  
  if (snap.empty) {
    await addDoc(collection(db, 'services'), {
      ...newService,
      createdAt: new Date().toISOString()
    });
    console.log('Added content strategy service');
  } else {
    const docRef = doc(db, 'services', snap.docs[0].id);
    await writeBatch(db).set(docRef, {
      ...newService,
      updatedAt: new Date().toISOString()
    }, { merge: true }).commit();
    console.log('Updated content strategy service');
  }
  process.exit(0);
}

addService().catch(console.error);
