module.exports=[38783,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactServerDOMTurbopackClient},27144,a=>{"use strict";var b=a.i(87924),c=a.i(75003),d=a.i(50944),e=a.i(38246),f=a.i(71987);function g(){let{data:a}=(0,c.useSession)();(0,d.useRouter)();let g=(0,d.usePathname)();return a?(0,b.jsx)("nav",{className:"bg-white border-b border-gray-200 shadow-md sticky top-0 z-50",children:(0,b.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,b.jsxs)("div",{className:"flex justify-between items-center h-20",children:[(0,b.jsxs)("div",{className:"flex items-center gap-8",children:[(0,b.jsxs)(e.default,{href:"/admin/dashboard",className:"flex items-center gap-3 group",children:[(0,b.jsx)("div",{className:"relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-500 group-hover:ring-emerald-600 transition-all",children:(0,b.jsx)(f.default,{src:"/images/logo.jpeg",alt:"Rise for Impact Logo",fill:!0,className:"object-cover"})}),(0,b.jsx)("div",{children:(0,b.jsx)("div",{className:"text-sm text-gray-600 font-semibold",children:"Admin Panel"})})]}),(0,b.jsx)("div",{className:"flex items-center space-x-1",children:[{href:"/admin/dashboard",label:"Dashboard",icon:"📊"},{href:"/admin/applications",label:"Applications",icon:"📝"},{href:"/admin/volunteers",label:"Volunteers",icon:"🙋"},{href:"/admin/opportunities",label:"Opportunities",icon:"🎯"},{href:"/admin/blogs",label:"Content",icon:"✍️"},{href:"/admin/team",label:"Team",icon:"👥"},{href:"/admin/programs",label:"Programs",icon:"📋"},{href:"/admin/newsletter",label:"Newsletter",icon:"📧"},{href:"/",label:"View Site",icon:"🌐"}].map(a=>(0,b.jsxs)(e.default,{href:a.href,className:`px-4 py-2 rounded-lg text-sm font-medium transition-all ${g.startsWith(a.href)&&"/"!==a.href?"bg-emerald-600 text-white shadow-md":"text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`,children:[(0,b.jsx)("span",{className:"mr-2",children:a.icon}),a.label]},a.href))})]}),(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsxs)("div",{className:"text-right",children:[(0,b.jsx)("div",{className:"text-xs text-gray-500",children:"Logged in as"}),(0,b.jsx)("div",{className:"text-sm font-medium text-gray-700",children:a.user?.email})]}),(0,b.jsx)("button",{onClick:()=>(0,c.signOut)({callbackUrl:"/admin/login"}),className:"px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg",children:"Logout"})]})]})})}):null}a.s(["default",()=>g])},98621,a=>{"use strict";function b(){for(var a,b,c=0,d="",e=arguments.length;c<e;c++)(a=arguments[c])&&(b=function a(b){var c,d,e="";if("string"==typeof b||"number"==typeof b)e+=b;else if("object"==typeof b)if(Array.isArray(b)){var f=b.length;for(c=0;c<f;c++)b[c]&&(d=a(b[c]))&&(e&&(e+=" "),e+=d)}else for(d in b)b[d]&&(e&&(e+=" "),e+=d);return e}(a))&&(d&&(d+=" "),d+=b);return d}a.s(["clsx",()=>b,"default",0,b])},70106,a=>{"use strict";var b=a.i(72131),c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let d=(a,d)=>{let e=(0,b.forwardRef)(({color:e="currentColor",size:f=24,strokeWidth:g=2,absoluteStrokeWidth:h,className:i="",children:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...c,width:f,height:f,stroke:e,strokeWidth:h?24*Number(g)/Number(f):g,className:["lucide",`lucide-${a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,i].join(" "),...k},[...d.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(j)?j:[j]]));return e.displayName=`${a}`,e};a.s(["default",()=>d],70106)},99570,96221,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(46271);let e=(0,a.i(70106).default)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);a.s(["Loader2",()=>e],96221);var f=a.i(68114);let g=(0,c.forwardRef)(({className:a,variant:c="primary",size:g="md",isLoading:h,disabled:i,children:j,leftIcon:k,rightIcon:l,fullWidth:m,animated:n=!0,...o},p)=>{let q=n?d.motion.button:"button";return(0,b.jsx)(q,{ref:p,className:(0,f.cn)("inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",{primary:"btn-premium",secondary:"bg-dark-800 text-white hover:bg-dark-700 shadow-lg",outline:"btn-outline-premium",ghost:"btn-ghost-premium",gradient:"bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"}[c],{sm:"px-4 py-2 text-sm",md:"px-6 py-3 text-base",lg:"px-8 py-4 text-lg",xl:"px-10 py-5 text-xl"}[g],m&&"w-full",a),disabled:i||h,...n?{whileHover:{scale:1.05},whileTap:{scale:.95}}:{},...o,children:h?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(e,{className:"w-5 h-5 animate-spin"}),(0,b.jsx)("span",{children:"Loading..."})]}):(0,b.jsxs)(b.Fragment,{children:[k&&(0,b.jsx)("span",{className:"shrink-0",children:k}),j,l&&(0,b.jsx)("span",{className:"shrink-0",children:l})]})})});g.displayName="Button",a.s(["Button",()=>g],99570)},33095,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return k},getImageProps:function(){return j}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(33354),g=a.r(94915),h=a.r(67161),i=f._(a.r(2305));function j(a){let{props:b}=(0,g.getImgProps)(a,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[a,c]of Object.entries(b))void 0===c&&delete b[a];return{props:b}}let k=h.Image},71987,(a,b,c)=>{b.exports=a.r(33095)},77156,a=>{"use strict";let b=(0,a.i(70106).default)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);a.s(["Eye",()=>b],77156)},66718,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(77156);let e=(0,a.i(70106).default)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);var f=a.i(68114);let g=(0,c.forwardRef)(({className:a,type:g,label:h,error:i,helperText:j,leftIcon:k,rightIcon:l,fullWidth:m,disabled:n,...o},p)=>{let[q,r]=(0,c.useState)(!1),s="password"===g,t=s&&q?"text":g;return(0,b.jsxs)("div",{className:(0,f.cn)("space-y-2",m&&"w-full"),children:[h&&(0,b.jsxs)("label",{className:"block text-sm font-medium text-dark-200",children:[h,o.required&&(0,b.jsx)("span",{className:"text-red-500 ml-1",children:"*"})]}),(0,b.jsxs)("div",{className:"relative",children:[k&&(0,b.jsx)("div",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-dark-400",children:k}),(0,b.jsx)("input",{type:t,className:(0,f.cn)("input-premium",k&&"pl-12",(l||s)&&"pr-12",i&&"border-red-500 focus:ring-red-500",n&&"opacity-50 cursor-not-allowed",m&&"w-full",a),ref:p,disabled:n,...o}),s&&(0,b.jsx)("button",{type:"button",onClick:()=>r(!q),className:"absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors",tabIndex:-1,children:q?(0,b.jsx)(e,{className:"w-5 h-5"}):(0,b.jsx)(d.Eye,{className:"w-5 h-5"})}),l&&!s&&(0,b.jsx)("div",{className:"absolute right-4 top-1/2 -translate-y-1/2 text-dark-400",children:l})]}),(i||j)&&(0,b.jsx)("p",{className:(0,f.cn)("text-sm",i?"text-red-500":"text-dark-400"),children:i||j})]})});g.displayName="Input",(0,c.forwardRef)(({className:a,label:c,error:d,helperText:e,rows:g=4,fullWidth:h,disabled:i,...j},k)=>(0,b.jsxs)("div",{className:(0,f.cn)("space-y-2",h&&"w-full"),children:[c&&(0,b.jsxs)("label",{className:"block text-sm font-medium text-dark-200",children:[c,j.required&&(0,b.jsx)("span",{className:"text-red-500 ml-1",children:"*"})]}),(0,b.jsx)("textarea",{rows:g,className:(0,f.cn)("input-premium resize-none",d&&"border-red-500 focus:ring-red-500",i&&"opacity-50 cursor-not-allowed",h&&"w-full",a),ref:k,disabled:i,...j}),(d||e)&&(0,b.jsx)("p",{className:(0,f.cn)("text-sm",d?"text-red-500":"text-dark-400"),children:d||e})]})).displayName="Textarea",a.s(["Input",()=>g],66718)},84312,a=>{"use strict";var b=a.i(87924),c=a.i(75003),d=a.i(50944),e=a.i(72131),f=a.i(27144),g=a.i(66718),h=a.i(99570);function i(){let{status:a}=(0,c.useSession)(),i=(0,d.useRouter)(),[j,k]=(0,e.useState)([]),[l,m]=(0,e.useState)(!0),[n,o]=(0,e.useState)(""),[p,q]=(0,e.useState)("all"),[r,s]=(0,e.useState)("all"),[t,u]=(0,e.useState)([]),[v,w]=(0,e.useState)(!1);(0,e.useEffect)(()=>{"unauthenticated"===a&&i.push("/admin/login")},[a,i]),(0,e.useEffect)(()=>{"authenticated"===a&&x()},[a]);let x=()=>{fetch("/api/apply").then(a=>a.json()).then(a=>{k(a),m(!1)}).catch(()=>m(!1))},y=(0,e.useMemo)(()=>j.filter(a=>{let b=a.name.toLowerCase().includes(n.toLowerCase())||a.email.toLowerCase().includes(n.toLowerCase()),c="all"===p||a.status===p,d="all"===r||a.type===r;return b&&c&&d}),[j,n,p,r]),z=async a=>{if(0!==t.length){w(!0);try{let b=t.map(b=>fetch(`/api/applications/${b}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:a})}));await Promise.all(b),x(),u([]),alert(`Successfully updated ${t.length} applications`)}catch(a){alert("Error updating applications")}finally{w(!1)}}};return"loading"===a||l?(0,b.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,b.jsx)("div",{className:"text-emerald-600 text-xl",children:"Loading..."})}):"unauthenticated"===a?null:(0,b.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50",children:[(0,b.jsx)(f.default,{}),(0,b.jsx)("div",{className:"p-8",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,b.jsxs)("div",{className:"mb-8 flex items-center justify-between",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-4xl font-bold text-emerald-600 mb-2",children:"Applications"}),(0,b.jsx)("p",{className:"text-gray-600",children:"View and manage all applications"})]}),(0,b.jsx)("button",{onClick:()=>i.push("/admin/dashboard"),className:"px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors",children:"Back to Dashboard"})]}),(0,b.jsxs)("div",{className:"bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6",children:[(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-4",children:[(0,b.jsxs)("div",{className:"md:col-span-2",children:[(0,b.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Search Applications"}),(0,b.jsx)(g.Input,{type:"text",placeholder:"Search by name or email...",value:n,onChange:a=>o(a.target.value),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Filter by Status"}),(0,b.jsxs)("select",{value:p,onChange:a=>q(a.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white",children:[(0,b.jsx)("option",{value:"all",children:"All Statuses"}),(0,b.jsx)("option",{value:"pending",children:"Pending"}),(0,b.jsx)("option",{value:"approved",children:"Approved"}),(0,b.jsx)("option",{value:"rejected",children:"Rejected"})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Filter by Type"}),(0,b.jsxs)("select",{value:r,onChange:a=>s(a.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white",children:[(0,b.jsx)("option",{value:"all",children:"All Types"}),(0,b.jsx)("option",{value:"volunteer",children:"Volunteer"}),(0,b.jsx)("option",{value:"partner",children:"Partner"}),(0,b.jsx)("option",{value:"donor",children:"Donor"})]})]})]}),(0,b.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-gray-200",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsxs)(h.Button,{onClick:()=>{let a=new Blob([["ID,Name,Email,Country,Type,Status,Date",...y.map(a=>[a.id,a.name,a.email,a.country,a.type,a.status,new Date(a.createdAt).toLocaleDateString()]).map(a=>a.map(a=>`"${a}"`).join(","))].join("\n")],{type:"text/csv"}),b=URL.createObjectURL(a),c=document.createElement("a");c.href=b,c.download=`applications_${new Date().toISOString().split("T")[0]}.csv`,c.click(),URL.revokeObjectURL(b)},className:"bg-blue-600 hover:bg-blue-700 text-white",children:[(0,b.jsx)("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Export CSV"]}),(0,b.jsxs)(h.Button,{onClick:()=>{let a=new Blob([JSON.stringify(y,null,2)],{type:"application/json"}),b=URL.createObjectURL(a),c=document.createElement("a");c.href=b,c.download=`applications_${new Date().toISOString().split("T")[0]}.json`,c.click(),URL.revokeObjectURL(b)},className:"bg-purple-600 hover:bg-purple-700 text-white",children:[(0,b.jsx)("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Export JSON"]})]}),t.length>0&&(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsxs)("span",{className:"text-sm text-gray-600",children:[t.length," selected"]}),(0,b.jsx)(h.Button,{onClick:()=>z("approved"),disabled:v,className:"bg-green-600 hover:bg-green-700 text-white",children:"Approve Selected"}),(0,b.jsx)(h.Button,{onClick:()=>z("rejected"),disabled:v,className:"bg-red-600 hover:bg-red-700 text-white",children:"Reject Selected"})]})]}),(0,b.jsxs)("div",{className:"mt-4 text-sm text-gray-600",children:["Showing ",y.length," of ",j.length," applications"]})]}),(0,b.jsx)("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:0===y.length?(0,b.jsx)("div",{className:"p-8 text-center text-gray-500",children:0===j.length?"No applications yet":"No applications match your filters"}):(0,b.jsx)("div",{className:"overflow-x-auto",children:(0,b.jsxs)("table",{className:"w-full",children:[(0,b.jsx)("thead",{className:"bg-emerald-50",children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{className:"px-6 py-4 text-left",children:(0,b.jsx)("input",{type:"checkbox",checked:t.length===y.length&&y.length>0,onChange:()=>{t.length===y.length?u([]):u(y.map(a=>a.id))},className:"w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"})}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-semibold text-gray-700",children:"Name"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-semibold text-gray-700",children:"Email"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-semibold text-gray-700",children:"Country"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-semibold text-gray-700",children:"Type"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-semibold text-gray-700",children:"Status"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-semibold text-gray-700",children:"Date"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-semibold text-gray-700",children:"Actions"})]})}),(0,b.jsx)("tbody",{className:"divide-y divide-gray-200",children:y.map(a=>(0,b.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsx)("input",{type:"checkbox",checked:t.includes(a.id),onChange:()=>{var b;return b=a.id,void u(a=>a.includes(b)?a.filter(a=>a!==b):[...a,b])},className:"w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"})}),(0,b.jsx)("td",{className:"px-6 py-4 text-sm text-gray-900",children:a.name}),(0,b.jsx)("td",{className:"px-6 py-4 text-sm text-gray-600",children:a.email}),(0,b.jsx)("td",{className:"px-6 py-4 text-sm text-gray-600",children:a.country}),(0,b.jsx)("td",{className:"px-6 py-4 text-sm",children:(0,b.jsx)("span",{className:"px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium",children:a.type})}),(0,b.jsx)("td",{className:"px-6 py-4 text-sm",children:(0,b.jsx)("span",{className:`px-3 py-1 rounded-full text-xs font-medium ${"pending"===a.status?"bg-yellow-100 text-yellow-700":"approved"===a.status?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:a.status})}),(0,b.jsx)("td",{className:"px-6 py-4 text-sm text-gray-600",children:new Date(a.createdAt).toLocaleDateString()}),(0,b.jsx)("td",{className:"px-6 py-4 text-sm",children:(0,b.jsxs)("div",{className:"flex gap-2",children:[(0,b.jsx)("button",{onClick:()=>i.push(`/admin/applications/${a.id}`),className:"px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors",children:"View Details"}),(0,b.jsxs)("button",{onClick:()=>{let b,c;return b=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Application - ${a.name}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #10b981;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #10b981;
      margin: 0;
      font-size: 32px;
    }
    .header p {
      color: #666;
      margin: 5px 0 0 0;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      font-weight: bold;
      color: #10b981;
      font-size: 14px;
      text-transform: uppercase;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    .section-content {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #10b981;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 25px;
    }
    .info-item {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
    }
    .info-label {
      font-weight: bold;
      color: #666;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .info-value {
      color: #333;
      font-size: 16px;
    }
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }
    .status-pending {
      background: #fef3c7;
      color: #92400e;
    }
    .status-approved {
      background: #d1fae5;
      color: #065f46;
    }
    .status-rejected {
      background: #fee2e2;
      color: #991b1b;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Rise for Impact</h1>
    <p>Application Details</p>
  </div>

  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Applicant Name</div>
      <div class="info-value">${a.name}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Email</div>
      <div class="info-value">${a.email}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Country</div>
      <div class="info-value">${a.country||"Not specified"}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Application Type</div>
      <div class="info-value">${a.type}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Status</div>
      <div class="info-value">
        <span class="status-badge status-${a.status}">${a.status.toUpperCase()}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-label">Submission Date</div>
      <div class="info-value">${new Date(a.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Message / Motivation</div>
    <div class="section-content">
      ${a.message||"No message provided"}
    </div>
  </div>

  <div class="footer">
    <p>Generated on ${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
    <p>Rise for Impact - Empowering African Youth Through Leadership</p>
  </div>
</body>
</html>
    `,void((c=window.open("","_blank"))&&(c.document.write(b),c.document.close(),c.onload=()=>{setTimeout(()=>{c.print(),c.onafterprint=()=>c.close()},250)}))},className:"px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1",title:"Download as PDF",children:[(0,b.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"PDF"]})]})})]},a.id))})]})})})]})})]})}a.s(["default",()=>i])}];

//# sourceMappingURL=_deac5aff._.js.map