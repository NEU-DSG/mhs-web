module.exports = {
    projects: [
        {
            initials: "CMS",
            full_name: "Catharine Maria Sedgwick Online Letters",
            short_desc: "The most highly regarded woman writer in the Early National period of American literature.",
        },
        {
            initials: "JQA",
            full_name: "John Quincy Adams Digital Diaries",
            short_desc: "The sixth president, a leading diplomat who shaped the Monroe Doctrine, and a lifelong advocate for education and abolition.",
        },
        {
            initials: "RBT",
            full_name: "The Papers of Roger Brooke Taney",
            short_desc: "One of the most consequential jurists of Antebellum America."
        },

        // Here, you could add another person to the site who would show up on all munus, navigation tabs etc. Make sure to create a matching dir in the 
        // data folder to hold all their data. THIS DIRECTORY SHOULD MATCH the initials param. 

    ],

    tools: [
        {
            tool: "coref",
            title: "Co-Reference Network Graph",
            short_desc: "People mentioned together in the papers.",
        },
        {
            tool: "geo",
            title: "Geo-Reference Map",
            short_desc: "Travels charted onto a modern map.",
        },
        {
            tool: "timeline",
            title: "Subject Reference Timeline",
            short_desc: "What's on their mind over time?"
        },

        // Here, you could add another tool to the site who would show up on all munus, navigation tabs etc. Make sure to create a matching dir in the 
        // each projects data directory. THIS DIRECTORY SHOULD MATCH the tool param. 
    ],

    custom_params: [

        // here you can add custom paramters if needed for any existing or feature visuzliations 
        {
            project: "JQA",
            tool: "geo",
            params: {
                files: ["1840-dateline-geojson.json",
                    "1841-dateline-geojson.json",
                    "1842-dateline-geojson.json",
                    "1843-dateline-geojson.json",
                    "1844-dateline-geojson.json",
                    "1845-dateline-geojson.json",
                    "1846-dateline-geojson.json",
                    "1847-dateline-geojson.json",
                    "1848-dateline-geojson.json",],
                desctext: "Below is a map plotting John Quincy Adams's movements and locations from his diary entries from 1840-1848. Each marker indicates a diary entry he wrote, and the location is generated from the dateline he would write at the top of each entry. These datelines were tagged by the editors, and then extracted by a parser script and ran through a Named Entity Recognition model that would identify location-related entities. They were then hand-checked and after manual verification ran through a geocoding API."
            },
        },

        {
            project: "JQA",
            tool: "coref",
            params: {
                tabs: [
                    {
                        number: 2,
                        title: "The Young Diarist and Early Legal Career",
                        short_title: "Early Legal Career",
                        icon: "fa-child",
                        date: "(November 1779 - August 1794)",
                        data_file: "1779-11-1794-8.json",
                        desc: "John Quincy Adams’s (JQA) diary, which was inspired by his father John Adams (JA) and started as a travel journal, initiated a lifelong writing obsession. In 1779, twelve-year-old JQA made his second trip abroad to accompany his father’s diplomatic mission. While in Europe, he attended various schools and traveled to St. Petersburg as an interpreter during Francis Dana’s mission to Russia. He subsequently served as JA’s secretary at Paris during the final months before the Anglo-American Definitive Peace Treaty was signed in September 1783. Two years later, JQA returned to the US. After graduating from Harvard College in 1787, he moved to Newburyport to read law under Theophilus Parsons. In 1790 he established a legal practice in Boston. JQA’s skill as a writer brought him public acclaim, and in 1794 President George Washington nominated him as US minister resident to the Netherlands."
                    },
                    {
                        number: 3,
                        title: "Diplomat, Senator, and Professor",
                        short_title: "Early Politics",
                        icon: "fa-gavel",
                        date: "(September 1794 - July 1809)",
                        data_file: "1794-9-1809-7.json",
                        desc: "John Quincy Adams (JQA) entered diplomatic service in September 1794 as US minister resident to the Netherlands. He married Louisa Catherine Johnson (LCA) in July 1797 after a fourteen-month engagement, and their three sons were born in this period. During his father John Adams’s (JA) presidency, they moved to Berlin where, as US minister plenipotentiary, JQA signed a new Prussian-American Treaty of Amity and Commerce. JQA returned to the US in 1801 and entered politics, elected first to the Massachusetts senate in 1802 and then to the US Senate in 1803. His contentious relationship with fellow Federalist members over his support of some Democratic-Republican policies led to his removal from office. In May 1808, the Federalist-controlled Massachusetts legislature voted to replace him at the end of his term, prompting JQA’s resignation in June. Between 1806 and 1809, he also served as the first Boylston Professor of Rhetoric and Oratory at Harvard."
                    },
                    {
                        number: 4,
                        title: "Later Diplomatic Career",
                        short_title: "Diplomat",
                        icon: "fa-flag",
                        date: "(August 1809 - August 1817)",
                        data_file: "1809-8-1817-8.json",
                        desc: "John Quincy Adams (JQA) returned to diplomatic service in August 1809 as the US’s first minister plenipotentiary to Russia. In St. Petersburg, JQA was well-liked by Emperor Alexander I and closely followed the battles of the Napoleonic Wars then raging across Europe. When the US declared war on Great Britain in 1812, Adams watched from afar as the conflict dragged on for two years. In April 1814, he traveled to Ghent, Belgium, as part of the US delegation to negotiate an end to the war with England; the Treaty of Ghent was signed on Christmas Eve. Subsequently appointed US minister to the Court of St. James’s in May 1815, JQA served in London for the next two years."
                    },
                    {
                        number: 5,
                        title: "Secretary of State",
                        short_title: "Sec. of State",
                        icon: "fa-flag-usa",
                        date: "(September 1817 - February 1825)",
                        data_file: "1817-9-1825-2.json",
                        desc: "John Quincy Adams (JQA) served as the US secretary of state during James Monroe’s presidency. Adams’s duties included organizing and responding to all State Department correspondence and negotiating agreements beneficial to the US. His achievements as secretary of state include the Anglo-American Convention of 1818, which established the US border with Canada along the 49th parallel, and the Adams-Onis Treaty of 1819, which resulted in the US acquisition of Florida. JQA also formulated the policy that became known as the Monroe Doctrine, in which the US called for European non-intervention in the western hemisphere, specifically in the affairs of newly independent Latin American nations."
                    },
                    {
                        number: 6,
                        title: "President",
                        short_title: "President",
                        icon: "fa-landmark-flag",
                        date: "(March 1825 - December 1829)",
                        data_file: "1825-3-1829-12.json",
                        desc: "John Quincy Adams (JQA) was inaugurated as the sixth president of the US on 4 March 1825 and began his administration with an ambitious agenda of improvements for American society. His presidency was embattled. Supporters of Andrew Jackson, who believed their candidate had unfairly lost the 1824 election, worked ceaselessly to foil JQA’s plans. Political mudslinging in advance of the 1828 presidential election was particularly fierce, and by mid-1827 JQA knew he would not be reelected."
                    },
                    {
                        number: 7,
                        title: "Return to Public Service",
                        short_title: "Return",
                        icon: "fa-rotate-left",
                        date: "(January 1830 - December 1838)",
                        data_file: "1830-1-1838-12.json",
                        desc: "In 1831 John Quincy Adams (JQA) became the only former president to subsequently serve in the US House of Representatives. As the chairman of the House Committee on Manufactures, he helped compose the compromise tariff bill of 1832. JQA regularly presented the antislavery petitions he received from across the country and vehemently opposed the passage of the Gag Rule in 1836 that prevented House discussion of petitions related to slavery. In 1838 he delivered a marathon speech condemning the evils of slavery."
                    },
                    {
                        number: 8,
                        title: "The Amistad Case and Final Years",
                        short_title: "Final Years",
                        icon: "fa-person-cane",
                        date: "(January 1839 - February 1848)",
                        data_file: "1839-1-1848-2.json",
                        desc: "During his final years of service in the US House of Representatives, John Quincy Adams (JQA) continued to oppose the Gag Rule that prevented House discussion of petitions related to slavery. In 1839 he joined the defense team for the Africans who revolted aboard the Spanish slave ship Amistad. The Supreme Court declared the Amistad Africans free on 9 March 1841 after JQA delivered oral arguments in their favor. He collapsed on the floor of the House on 21 February 1848 and died two days later."
                    }
                ],
            },
        },

        {
            project: "CMS",
            tool: "coref",
            params: {
                tabs: [
                    {
                        number: 2,
                        title: "Coming of Age in the New Republic",
                        short_title: "1789-1813",
                        icon: "",
                        date: "(1789 - 1813)",
                        data_file: "1789-1813-cms-ref.json",
                        desc: "Catharine Maria Sedgwick’s early letters document the intellectual development of a prolific woman writer from her childhood in the early national period through the 1813 death of her father Theodore Sedgwick, a Federalist member of Congress and Massachusetts supreme court judge. The youngest daughter in a family of seven siblings, Sedgwick practiced epistolary conventions in her early letters while introducing her lifelong theme of balancing personal and family expectations with the obligation to write. As Sedgwick reported in her later autobiography, she felt that she lacked a satisfactory formal education, but “these great deficiencies” were offset by the quality of her homelife. Her adolescent years were marked by her mother’s chronic ill health and death in 1807, her father’s remarriage in 1808, and her engagement with her siblings’ growing families throughout the period. By 1812, as a 22-year old republican woman reflecting on her social position, CMS felt the call of a “life dignified by usefulness” and compared her father’s contributions to her own potential: “You may benefit a Nation my dear Papa, & I may improve the condition of a fellow being” (1 Mar. 1812)."
                    },
                    {
                        number: 3,
                        title: "Developing a Voice and Vocation",
                        short_title: "1813-1822",
                        icon: "",
                        date: "(1813 - 1822)",
                        data_file: "1813-1822-cms-ref.json",
                        desc: "Letters from Sedgwick’s pre-publication adulthood demonstrate her intellectual and religious development as she grappled with events both personal and national. Her siblings became the central focus of her domestic life, and the Sedgwicks’ experiences with “the market of matrimony” (15 Aug. 1813) provide intriguing fodder for epistolary debate. Sedgwick rejected at least two marriage proposals in her twenties, one in 1812 and another in 1819. In the summer of 1821, she traveled to Niagara Falls and Montreal and began keeping a journal. As Sedgwick developed her authorial persona and worked on her first novel, her full-throated dedication to family, female relationships, and personal usefulness emerged as primary concerns. Sedgwick’s letters also become more philosophical, and her lifelong dedication to republican service and intellectual Unitarianism come into focus. Sedgwick explains her sense of vocation to her lifelong friend Eliza Cabot Follen: “my ministry must be one of watchfulness and steady devotion, and all those cares that love teaches, and can pay without being asked” (15 Nov 1822)."
                    },
                    {
                        number: 4,
                        title: "Negotiating Public and Private Lives",
                        short_title: "1822-1835",
                        icon: "",
                        date: "(1822 - 1835)",
                        data_file: "1822-1835-cms-ref.json",
                        desc: "With her first novel A New-England Tale (1822), Sedgwick established herself as a professional writer, and she published four additional literary novels and more than 30 stories during this period. As a dedicated family woman, who also chose to be single and an author, she constructed domestic arrangements that complemented her writing career. She lived in the homes of her brothers and sisters-in-law in Stockbridge, Lenox, and New York City, deepening her relationships with her siblings as well as caring for the children and contributing to their education. Redwood, her second novel, received “much more praise and celebrity than [she] expected” (18 Oct. 1824). As her fame grew, she continued to find her spiritual home in Unitarianism, while her range of acquaintances expanded to include artists, politicians, reformers, educators, and intellectuals. Sedgwick began to travel more widely, visiting friends in Boston, Newport, and Philadelphia, and making extended trips to Washington DC and the South. As a measure of her celebrity, she was selected for inclusion in the National Portrait Gallery of Distinguished Americans (1834), the only woman included other than Martha Washington. The period was also punctuated by “the real and bitter sorrows that cloud our life” (13 Mar. 1830), including the deaths of her sister Eliza, her childhood nurse Elizabeth Freeman, and her brother Harry."
                    }
                ],
            },
        },

        {
            project: "RBT",
            tool: "coref",
            params: {
                tabs: [
                    {
                        number: 2,
                        title: "State and National Politics",
                        short_title: "1816-1831",
                        icon: "",
                        date: "(January 1816 - May 1831)",
                        data_file: "1816-01-1831-05-rbt.json",
                        desc: "With the end of the War of 1812, leading Marylanders turned to state and local concerns. Taney immersed himself in issues such as banking, currency, and internal improvements while serving as a state senator (1816-1821) and state attorney general (1827-1831). The latter post, Taney would recall, represented \"my highest ambition,\" as \"it had been most commonly filled by highly gifted and eminent men . . .\" As a private attorney, he achieved some notoriety while representing Jacob Gruber, a Pennsylvania Methodist minister who was charged with inciting slaves to insurrection after delivering an anti-slavery sermon in Hagerstown in the summer of 1818. Taney, who had recently freed his own slaves, successfully argued for Gruber on free speech grounds. Taney moved to Baltimore in 1823, and made his first appearance before the U.S. Supreme Court two years later. By this time he had hitched his political wagon to Andrew Jackson, who would remember Taney's support when reorganizing his cabinet in the aftermath of the Eaton affair."
                    },
                    {
                        number: 3,
                        title: "U.S. Attorney General",
                        short_title: "1831-1833",
                        icon: "",
                        date: "(June 1831 - August 1833)",
                        data_file: "1831-06-1833-08-rbt.json",
                        desc: "On 21 June 1831 President Jackson appointed Taney Attorney General of the United States. Over the next two years, other cabinet members would call on Taney for opinions on subjects both domestic and international. One case that concerned both spheres involved a South Carolina law that provided for the temporary imprisonment of free blacks employed on foreign vessels calling on ports of the state, with said sailors sold into slavery if the master of the vessel could not pay for their confinement. When the British protested the law as a violation of treaty obligations, Taney opined that it was a valid protection against the potential unrest resulting from free blacks visiting a slave state. Attorney General Taney also weighed in on the Bank War, the titanic struggle between President Jackson and the Bank of the United States. It was Taney's lengthy opinion on the recharter of the bank that informed Jackson's famous veto message of 10 July 1832."
                    },
                    {
                        number: 4,
                        title: "Secretary of the Treasury",
                        short_title: "1833-1834",
                        icon: "",
                        date: "(September 1833 - June 1834)",
                        data_file: "1833-09-1834-06-rbt.json",
                        desc: "Taney's tenure as Secretary of the Treasury was brief, but turbulent. It began in September 1833, when President Jackson appointed him to replace William John Duane, who had refused to comply with Jackson's directive to remove federal deposits from the Bank of the United States. Secretary Taney oversaw the removal process, including the selection of banks to receive government funds. One of these \"pet\" banks was Baltimore's Union Bank of Maryland, headed by Thomas Ellicott, a Quaker friend of Taney's. Ellicott's misuse of government funds proved to be a major source of consternation for Taney, who exchanged numerous contentious letters with his erstwhile ally in early 1834. This controversy over the Union Bank provided ammunition for Whig opponents to the removal of deposits. Taney would pay the price on 24 June 1834, when the Senate rejected his nomination as Secretary of the Treasury. He returned to his private practice, which he had all but abandoned after assuming the Treasury post."
                    },
                    {
                        number: 5,
                        title: "Chief Justice: A Jacksonian Jurist",
                        short_title: "1834-1857",
                        icon: "",
                        date: "(July 1834 - February 1857)",
                        data_file: "1834-07-1857-02-rbt.json",
                        desc: "Taney's respite from public office ended on 15 March 1836, when the Senate confirmed his nomination as Chief Justice of the Supreme Court of the United States. In succeeding John Marshall, the stalwart guardian of nationalism and property rights, Taney proved to be more sympathetic to states' rights and economic competition. Thus in Charles River Bridge Company v. Warren Bridge Company (1837), one of the first major cases to appear before his court, Taney held that the Massachusetts legislature's granting of a charter for construction of a bridge across the Charles River—in competition with a nearby bridge chartered decades before—was not a violation of the U.S. Constitution's contract clause. Taney further refined Marshall's \"national capitalism\" in cases such as Bank of Augusta v. Earle (1839), Swift v. Tyson (1842), and Cooley v. Board of Wardens of the Port of Philadelphia (1852). All the while, he endured a series of crises on the home front. One daughter was an invalid, and another left her husband (\"an evil . . . hypocrite,\" in Taney's estimation) to return home. Tragedy struck in September 1855, when Taney's wife and youngest daughter died from fever on consecutive days."
                    },
                    {
                        number: 6,
                        title: "Chief Justice: Dred Scott and the Civil War",
                        short_title: "1857-1865",
                        icon: "",
                        date: "(March 1857 - October 1865)",
                        data_file: "1857-03-1865-10-rbt.json",
                        desc: "On 6 March 1857 Chief Justice Taney delivered the majority opinion in Dred Scott v. Sandford, a case that centered on a Missouri slave who had sued for his freedom on the grounds that he and his owner had temporarily resided in Illinois and the Wisconsin Territory. Taney asserted that Scott was still a slave, in part because blacks were not U.S. citizens and thus \"had no rights which the white man was bound to respect\"—including the right to sue in federal courts. Taney's ruling provoked outrage throughout the North, exacerbating sectional tensions over slavery that culminated in civil war. When that war came, Taney proved to be a stalwart critic of the Lincoln administration's policies, noting in Ex parte Merryman (1861) that the President had no power under the Constitution to suspend the writ of habeas corpus. Yet by this point both his reputation and his health were broken. After Taney's death on 12 October 1864, Charles Sumner—for whom Taney had once written a letter of introduction—presciently stated that \"the name of Taney is to be hooted down the page of history.\""
                    }
                ],
            },
        },

    ],

};