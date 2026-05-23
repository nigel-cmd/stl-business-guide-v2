(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,56420,e=>{"use strict";var t=e.i(71645);let s=(...e)=>e.filter((e,t,s)=>!!e&&""!==e.trim()&&s.indexOf(e)===t).join(" ").trim(),r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,t.createContext)({}),i=(0,t.forwardRef)(({color:e,size:r,strokeWidth:i,absoluteStrokeWidth:l,className:o="",children:c,iconNode:u,...d},m)=>{let{size:h=24,strokeWidth:f=2,absoluteStrokeWidth:p=!1,color:E="currentColor",className:x=""}=(0,t.useContext)(n)??{},g=l??p?24*Number(i??f)/Number(r??h):i??f;return(0,t.createElement)("svg",{ref:m,...a,width:r??h??a.width,height:r??h??a.height,stroke:e??E,strokeWidth:g,className:s("lucide",x,o),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(d)&&{"aria-hidden":"true"},...d},[...u.map(([e,s])=>(0,t.createElement)(e,s)),...Array.isArray(c)?c:[c]])});e.s(["default",0,(e,a)=>{let n=(0,t.forwardRef)(({className:n,...l},o)=>(0,t.createElement)(i,{ref:o,iconNode:a,className:s(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...l}));return n.displayName=r(e),n}],56420)},95057,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return o}};for(var a in r)Object.defineProperty(s,a,{enumerable:!0,get:r[a]});let n=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:s}=e,r=e.protocol||"",a=e.pathname||"",l=e.hash||"",o=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:s&&(c=t+(~s.indexOf(":")?`[${s}]`:s),e.port&&(c+=":"+e.port)),o&&"object"==typeof o&&(o=String(n.urlQueryToSearchParams(o)));let u=e.search||o&&`?${o}`||"";return r&&!r.endsWith(":")&&(r+=":"),e.slashes||(!r||i.test(r))&&!1!==c?(c="//"+(c||""),a&&"/"!==a[0]&&(a="/"+a)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),u&&"?"!==u[0]&&(u="?"+u),a=a.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${r}${c}${a}${u}${l}`}let o=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},18581,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"useMergedRef",{enumerable:!0,get:function(){return a}});let r=e.r(71645);function a(e,t){let s=(0,r.useRef)(null),a=(0,r.useRef)(null);return(0,r.useCallback)(r=>{if(null===r){let e=s.current;e&&(s.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(s.current=n(e,r)),t&&(a.current=n(t,r))},[e,t])}function n(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let s=e(t);return"function"==typeof s?s:()=>e(null)}}("function"==typeof s.default||"object"==typeof s.default&&null!==s.default)&&void 0===s.default.__esModule&&(Object.defineProperty(s.default,"__esModule",{value:!0}),Object.assign(s.default,s),t.exports=s.default)},73668,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"isLocalURL",{enumerable:!0,get:function(){return n}});let r=e.r(18967),a=e.r(52817);function n(e){if(!(0,r.isAbsoluteUrl)(e))return!0;try{let t=(0,r.getLocationOrigin)(),s=new URL(e,t);return s.origin===t&&(0,a.hasBasePath)(s.pathname)}catch(e){return!1}}},84508,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"errorOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},22016,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={default:function(){return x},useLinkStatus:function(){return N}};for(var a in r)Object.defineProperty(s,a,{enumerable:!0,get:r[a]});let n=e.r(90809),i=e.r(43476),l=n._(e.r(71645)),o=e.r(95057),c=e.r(8372),u=e.r(18581),d=e.r(18967),m=e.r(5550);e.r(33525);let h=e.r(88540),f=e.r(91949),p=e.r(73668),E=e.r(9396);function x(t){var s,r;let a,n,x,[N,b]=(0,l.useOptimistic)(f.IDLE_LINK_STATUS),T=(0,l.useRef)(null),{href:y,as:A,children:C,prefetch:R=null,passHref:v,replace:j,shallow:w,scroll:_,onClick:O,onMouseEnter:L,onTouchStart:S,legacyBehavior:I=!1,onNavigate:U,transitionTypes:M,ref:k,unstable_dynamicOnHover:D,...P}=t;a=C,I&&("string"==typeof a||"number"==typeof a)&&(a=(0,i.jsx)("a",{children:a}));let F=l.default.useContext(c.AppRouterContext),W=!1!==R,B=!1!==R?null===(r=R)||"auto"===r?E.FetchStrategy.PPR:E.FetchStrategy.Full:E.FetchStrategy.PPR,H="string"==typeof(s=A||y)?s:(0,o.formatUrl)(s);if(I){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=l.default.Children.only(a)}let X=I?n&&"object"==typeof n&&n.ref:k,G=l.default.useCallback(e=>(null!==F&&(T.current=(0,f.mountLinkInstance)(e,H,F,B,W,b)),()=>{T.current&&((0,f.unmountLinkForCurrentNavigation)(T.current),T.current=null),(0,f.unmountPrefetchableInstance)(e)}),[W,H,F,B,b]),V={ref:(0,u.useMergedRef)(G,X),onClick(t){I||"function"!=typeof O||O(t),I&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!F||t.defaultPrevented||function(t,s,r,a,n,i,o){if("u">typeof window){let c,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,p.isLocalURL)(s)){a&&(t.preventDefault(),location.replace(s));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);l.default.startTransition(()=>{d(s,a?"replace":"push",!1===n?h.ScrollBehavior.NoScroll:h.ScrollBehavior.Default,r.current,o)})}}(t,H,T,j,_,U,M)},onMouseEnter(e){I||"function"!=typeof L||L(e),I&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),F&&W&&(0,f.onNavigationIntent)(e.currentTarget,!0===D)},onTouchStart:function(e){I||"function"!=typeof S||S(e),I&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),F&&W&&(0,f.onNavigationIntent)(e.currentTarget,!0===D)}};return(0,d.isAbsoluteUrl)(H)?V.href=H:I&&!v&&("a"!==n.type||"href"in n.props)||(V.href=(0,m.addBasePath)(H)),x=I?l.default.cloneElement(n,V):(0,i.jsx)("a",{...P,...V,children:a}),(0,i.jsx)(g.Provider,{value:N,children:x})}e.r(84508);let g=(0,l.createContext)(f.IDLE_LINK_STATUS),N=()=>(0,l.useContext)(g);("function"==typeof s.default||"object"==typeof s.default&&null!==s.default)&&void 0===s.default.__esModule&&(Object.defineProperty(s.default,"__esModule",{value:!0}),Object.assign(s.default,s),t.exports=s.default)},89664,e=>{"use strict";let t=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],89664)},18991,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(56420);let a=(0,r.default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var n=e.i(89664);let i=(0,r.default)("database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]),l=(0,r.default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var o=e.i(22016);let c=`-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategories TEXT[] DEFAULT '{}',
  
  -- Location
  address TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'USA',
  
  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  
  -- Content
  description TEXT,
  short_description VARCHAR(500),
  services TEXT[] DEFAULT '{}',
  
  -- Media
  logo_url TEXT,
  photos TEXT[] DEFAULT '{}',
  cover_image TEXT,
  
  -- Membership
  tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'vip')),
  is_featured BOOLEAN DEFAULT false,
  featured_until TIMESTAMP WITH TIME ZONE,
  
  -- Ratings
  rating DECIMAL(2,1) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  
  -- Social
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  
  -- Business hours (stored as JSON)
  business_hours JSONB,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  claimed_by UUID,
  is_verified BOOLEAN DEFAULT false,
  
  -- Search vector for full-text search
  search_vector tsvector
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster searches
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_businesses_state ON businesses(state);
CREATE INDEX idx_businesses_tier ON businesses(tier);
CREATE INDEX idx_businesses_featured ON businesses(is_featured) WHERE is_featured = true;
CREATE INDEX idx_businesses_verified ON businesses(is_verified);
CREATE INDEX idx_businesses_search ON businesses USING GIN(search_vector);

-- Create function to update search vector
CREATE OR REPLACE FUNCTION update_business_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.category, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.services::text, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update search vector
CREATE TRIGGER businesses_search_vector_update
  BEFORE INSERT OR UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_business_search_vector();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO businesses (
  name, slug, category, subcategories, city, state, 
  phone, email, website, description, short_description,
  tier, is_featured, is_verified, rating, review_count
) VALUES 
(
  'True Products Marketing',
  'true-products-marketing',
  'Marketing Agency',
  ARRAY['SEO', 'Web Design', 'Social Media'],
  'Chesterfield', 'MO',
  '(314) 886-8084',
  'info@trueproductsnetwork.com',
  'https://trueproductsnetwork.com',
  'Full-service digital marketing agency helping local businesses grow online presence. We specialize in SEO, web design, and social media marketing.',
  'Digital marketing agency specializing in SEO and web design',
  'vip', true, true, 5.0, 47
),
(
  'AIM Training & Consultancy',
  'aim-training-consultancy',
  'Business Training',
  ARRAY['Training', 'Consulting', 'Coaching'],
  'St. Louis', 'MO',
  '(314) 555-0123',
  'info@aimtraining.com',
  'https://aimtraining.com',
  'Professional training and consulting services for businesses of all sizes.',
  'Business training and consulting services',
  'premium', true, true, 4.9, 32
),
(
  'Missouri SEO Agency',
  'missouri-seo-agency',
  'SEO Services',
  ARRAY['SEO', 'PPC', 'Analytics'],
  'St. Charles', 'MO',
  '(636) 555-0456',
  'info@missouriseo.com',
  'https://missouriseo.com',
  'Expert SEO services to get your business ranking on page one of Google.',
  'Expert SEO services for local businesses',
  'premium', false, true, 4.8, 28
),
(
  'MJM Lawn & Land',
  'mjm-lawn-land',
  'Landscaping',
  ARRAY['Lawn Care', 'Landscaping', 'Maintenance'],
  'Chesterfield', 'MO',
  '(314) 555-0789',
  'info@mjmlawn.com',
  'https://mjmlawn.com',
  'Professional lawn care and landscaping services for residential and commercial properties.',
  'Professional lawn care and landscaping',
  'vip', true, true, 4.9, 56
),
(
  'Schneider Roofing',
  'schneider-roofing',
  'Roofing Services',
  ARRAY['Roofing', 'Repairs', 'Inspections'],
  'St. Louis', 'MO',
  '(314) 555-0321',
  'info@schneiderroofing.com',
  'https://schneiderroofing.com',
  'Family-owned roofing company serving St. Louis for over 30 years.',
  'Family-owned roofing company',
  'free', false, true, 4.7, 89
),
(
  'Elite Dental Care',
  'elite-dental-care',
  'Dental Services',
  ARRAY['Dental', 'Cosmetic', 'Family'],
  'St. Charles', 'MO',
  '(636) 555-0654',
  'info@elitedental.com',
  'https://elitedental.com',
  'Comprehensive dental care with state-of-the-art technology.',
  'Comprehensive dental care',
  'premium', false, true, 4.9, 124
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON reviews
  FOR SELECT USING (true);`;e.s(["default",0,function(){let[e,r]=(0,s.useState)(!1),u=async()=>{await navigator.clipboard.writeText(c),r(!0),setTimeout(()=>r(!1),2e3)};return(0,t.jsxs)("main",{className:"min-h-screen bg-gray-50",children:[(0,t.jsx)("div",{className:"bg-[#371a5b] text-white",children:(0,t.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",children:[(0,t.jsxs)(o.default,{href:"/",className:"inline-flex items-center text-white/80 hover:text-white mb-4",children:[(0,t.jsx)(l,{className:"w-4 h-4 mr-2"}),"Back to Home"]}),(0,t.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,t.jsx)(i,{className:"w-8 h-8 text-[#54afe6]"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold",style:{fontFamily:"Montserrat, sans-serif"},children:"Supabase Database Schema"}),(0,t.jsx)("p",{className:"text-white/70 text-sm",children:"Copy this SQL and run it in your Supabase SQL Editor"})]})]})]})}),(0,t.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6 mb-6",children:[(0,t.jsx)("h2",{className:"text-lg font-semibold text-[#371a5b] mb-4",children:"How to Apply This Schema"}),(0,t.jsxs)("ol",{className:"space-y-3 text-gray-700",children:[(0,t.jsxs)("li",{className:"flex items-start",children:[(0,t.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"1"}),(0,t.jsxs)("span",{children:["Go to ",(0,t.jsx)("a",{href:"https://supabase.com/dashboard/project/catwmqztvgmdwiusroar",target:"_blank",rel:"noopener noreferrer",className:"text-[#54afe6] hover:underline",children:"your Supabase Dashboard"})]})]}),(0,t.jsxs)("li",{className:"flex items-start",children:[(0,t.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"2"}),(0,t.jsx)("span",{children:'Click "SQL Editor" in the left sidebar'})]}),(0,t.jsxs)("li",{className:"flex items-start",children:[(0,t.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"3"}),(0,t.jsx)("span",{children:'Click "New Query"'})]}),(0,t.jsxs)("li",{className:"flex items-start",children:[(0,t.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"4"}),(0,t.jsx)("span",{children:"Copy the SQL below (click the copy button)"})]}),(0,t.jsxs)("li",{className:"flex items-start",children:[(0,t.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"5"}),(0,t.jsx)("span",{children:'Paste into the SQL Editor and click "Run"'})]})]})]}),(0,t.jsxs)("div",{className:"bg-gray-900 rounded-xl overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700",children:[(0,t.jsx)("span",{className:"text-gray-400 text-sm font-mono",children:"schema.sql"}),(0,t.jsx)("button",{onClick:u,className:"flex items-center space-x-2 text-gray-400 hover:text-white transition-colors",children:e?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.Check,{className:"w-4 h-4 text-green-400"}),(0,t.jsx)("span",{className:"text-sm text-green-400",children:"Copied!"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a,{className:"w-4 h-4"}),(0,t.jsx)("span",{className:"text-sm",children:"Copy"})]})})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-6 text-sm font-mono text-gray-300 leading-relaxed",children:(0,t.jsx)("code",{children:c})})})]}),(0,t.jsxs)("div",{className:"mt-8 grid md:grid-cols-2 gap-6",children:[(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-[#371a5b] mb-4",children:"Tables Created"}),(0,t.jsxs)("ul",{className:"space-y-2 text-gray-700",children:[(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-[#54afe6] rounded-full mr-3"}),(0,t.jsx)("code",{className:"bg-gray-100 px-2 py-1 rounded text-sm",children:"businesses"}),(0,t.jsx)("span",{className:"ml-2 text-gray-500",children:"- Main business listings"})]}),(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-[#54afe6] rounded-full mr-3"}),(0,t.jsx)("code",{className:"bg-gray-100 px-2 py-1 rounded text-sm",children:"reviews"}),(0,t.jsx)("span",{className:"ml-2 text-gray-500",children:"- Customer reviews"})]})]})]}),(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-[#371a5b] mb-4",children:"Sample Data Included"}),(0,t.jsxs)("ul",{className:"space-y-2 text-gray-700",children:[(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-[#ffc107] rounded-full mr-3"}),"True Products Marketing (VIP)"]}),(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-[#bb7ce4] rounded-full mr-3"}),"AIM Training & Consultancy (Premium)"]}),(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-[#bb7ce4] rounded-full mr-3"}),"Missouri SEO Agency (Premium)"]}),(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-[#ffc107] rounded-full mr-3"}),"MJM Lawn & Land (VIP)"]}),(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-gray-400 rounded-full mr-3"}),"Schneider Roofing (Free)"]}),(0,t.jsxs)("li",{className:"flex items-center",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-[#bb7ce4] rounded-full mr-3"}),"Elite Dental Care (Premium)"]})]})]})]})]})]})}],18991)}]);