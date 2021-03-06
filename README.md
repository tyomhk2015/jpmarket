# jpmarket
A web-app for buying JP goods.

For a new cash flow.

<hr>

Stack

Frontend: React 18(RC), Next.js, Typescript, Tailwind

Backend: Prisma, Cloudflare

Deploy: Vercel

<hr>

Initial setting

<pre>
  // Installing React 18 RC
  npm i next@latest react@rc react-dom@rc

  // Install tailwind and others
  npm install -D tailwindcss postcss autoprefixer

  // Create default tailwind.css file
  npx tailwindcss init -p
</pre>

<br>

<hr>

# TailwindCSS

In the past, Tailwind.css was a big CSS file have immense amount of combinations of CSS code. For the production deployment, there was a process of scanning and deleting unused CSS codes, before Tailwind V3. This process is called '<a href="https://v2.tailwindcss.com/docs/optimizing-for-production">purging</a>'. 

Thanks to JIT compiler, lightening the CSS file became possible. In other words, Tailwind.css will not hold all the combination of CSS codes that may have potential usage. Instead, Tailwind.css creates CSS codes on demand dynamically. As long as you don't write tailwind.css class names, no new CSS codes will be added to your project, more specifically in the ```<style>``` tag.

Tailwind.css do provide many class names for CSS, but you can also write customized CSS codes.
```
// Tailwind.css  =>  Customized Tailwind.css

text-lg => text-[99px]
text-black-900 => text-[#000]
bg-red-900 => bg-[#FF0000]

// For background images.
=> bg-[url('your/image/path.svg')]
```

Available Plugins: <a href="https://tailwindcss.com/docs/plugins">Link</a>

Tips for rounded borders
```
// Applies rounded borders for left or right side only.
.round-r-md,
.round-l-md,
```

Icons for the project: <a href="https://heroicons.dev/">https://heroicons.dev/</a>

Tips for adding border line between lists.
```
// No more explicitly defining border-top / -bottom at lists.
// This must be applied to parent node.
.divide-y-{width}
.divide-x-{width}
```

<hr>

# Prisma 

<a href="https://www.prisma.io/">Homepage</a>

ORM for Node.js & Typescript, a translator for typescript and database.
<br>Instead of writing real SQL, Node.js & Typescript can be used for using database.

### schema.prisma ??????

A file that tells prisma how your database looks like, and how your data will be structured.

If prisma has information about the data or types, prisma can generate a client. ```Client``` is like a helper for talking to database using typescript.


# Planetscale

<a href="https://planetscale.com/">Link</a>

# React Hook Form 

<a href="https://react-hook-form.com/">Link</a>

# Twilio & SendGrid

???? <a href="https://www.twilio.com/">Link</a>
<br>
??????Caution!
<br>Make sure to sign up with proper and verifiable SNS account.
<br>Do not forget to give required use case information sincerely.
<br>Otherwise, the account gets suspended.
<br>
<br>The account can be recovered from suspension by giving required information by Twilio Support Team via Email.

<br>
???? <a href="https://app.sendgrid.com/">Link</a>

# Iron-session

<a href="https://github.com/vvo/iron-session">Link</a>

# SWR (stale-while-revalidate)

<a href="https://swr.vercel.app/">Link</a>

# Cloudflare Images

<a href="https://www.cloudflare.com/products/cloudflare-images/">Link</a>
<br>
<a href="https://developers.cloudflare.com/images/cloudflare-images/upload-images/direct-creator-upload/">Direct Creator Uploads</a>