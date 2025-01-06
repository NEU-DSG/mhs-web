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
                        title: "Co-References",
                        short_title: "Co-Ref",
                        icon: "fa-diagram-project",
                        date: "(1797 - 1828)",
                        data_file: "data.json",
                        desc: "To encourage and support the integrity of future scholarship, the CMS Online Letters (CMSOL) project will make available all letters written by Sedgwick during her nearly seven decades as an active correspondent, with authoritative transcriptions and selected holographs. Approximately two-thirds of Sedgwick’s letters reside at MHS and are available on microfilm; additional letters are held in other MHS collections, but many letters are scattered in archives across the nation and abroad. Our initial web publication is devoted to Sedgwick’s early years, beginning with her childhood letters of the 1790s and extending to 1826, shortly after her second novel, Redwood, had brought her national and international fame. This era’s letters (approximately 300) anticipate the issues Sedgwick explores in a lifetime of creative work."
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
                        title: "Co-References",
                        short_title: "Co-Ref",
                        icon: "fa-diagram-project",
                        date: "(1828 - 1866)",
                        data_file: "data.json",
                        desc: "Roger Brooke Taney (1777 – 1864) was one of the most significant American jurists of the 19th century, second only to John Marshall (1755 – 1835) in importance. Although remembered today for his decision in Dred Scott v. Sandford, Taney wielded considerable political influence in the years prior to his appointment to the Supreme Court. His writings during the first half of the 1830s provide insights into the political and economic dynamics of the period, the lessons of which inform the contemporary American political scene and our understanding of his juridical reasoning."
                    }
                ],
            },
        },

    ],

};