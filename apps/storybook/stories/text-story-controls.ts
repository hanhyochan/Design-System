import { typographyNames, type Typography, type TextProps, type ResponsiveValue } from '@h_designsystem/ui';
import type { Meta } from '@storybook/react-vite';
import { configure, escape } from './components/shared/source/shared';
export type TextStoryArgs = TextProps & { responsive?:boolean; baseTypography?:string; mobileTypography?:string; tabletTypography?:string; desktopTypography?:string; codeEnvironment?:'React'|'Vue'|'Svelte'|'HTML'|'JSP' };
export function textSelection(args: TextStoryArgs): ResponsiveValue<Typography> | undefined {
  if(!args.responsive)return args.typography;
  return Object.fromEntries(['base','mobile','tablet','desktop'].map(key=>[key,args[(key+'Typography') as 'baseTypography']]).filter(([,value])=>value&&value!=='unset'));
}
export const textStoryArgTypes = {
  as:{name:'HTML 태그 (as)',control:'radio',options:['span','p','h1','h2','h3','h4','h5','h6','label']},
  typography:{name:'타이포그래피',control:'select',options:typographyNames},
  language:{name:'언어',control:'radio',options:['ko','en']},children:{name:'내용',control:'text'},
  responsive:{name:'반응형',control:'boolean'},
  codeEnvironment:{name:'사용 코드 환경',control:'inline-radio',options:['React','Vue','Svelte','HTML','JSP']},
  ...Object.fromEntries(['base','mobile','tablet','desktop'].map(key=>[key+'Typography',{name:key,control:{type:'select',labels:{unset:'미지정'}},options:['unset',...typographyNames],if:{arg:'responsive'}}])),
} satisfies NonNullable<Meta<TextStoryArgs>['argTypes']>;
export const textStorySource = { type:'dynamic' as const, transform:(_source:string,{args}:{args:TextStoryArgs})=>{
  const typography=textSelection(args)??'body_16_400'; const environment=args.codeEnvironment??'React';const value=JSON.stringify(typography);const text=typeof args.children==='string'?args.children:'텍스트';
  const setup=args.responsive?"import { configureDesignSystem } from '@h_designsystem/ui/config';\n"+configure+'\n':'';
  if(environment==='React')return "import '@h_designsystem/ui/styles.css';\nimport { Text } from '@h_designsystem/ui';\n"+setup+'\n<Text as="'+args.as+'" typography={'+value+'} language="'+args.language+'">{'+JSON.stringify(text)+'}</Text>';
  let attrs='as="'+args.as+'" language="'+args.language+'" ';
  attrs+=environment==='Vue'?":typography.prop='"+escape(value)+"'":environment==='Svelte'?'typography={'+value+'}':"typography='"+escape(typeof typography==='string'?typography:value)+"'";
  const markup='<h-text '+attrs+'>'+escape(text).replaceAll('{','&#123;').replaceAll('}','&#125;')+'</h-text>';
  if(environment==='Vue'||environment==='Svelte')return "<script"+(environment==='Vue'?' setup':'')+">\nimport '@h_designsystem/ui/elements';\nimport '@h_designsystem/ui/styles.css';\n"+setup+'</script>\n'+(environment==='Vue'?'<template>'+markup+'</template>':markup);
  const root=environment==='JSP'?'${pageContext.request.contextPath}/assets':'./assets';
  return '<link rel="stylesheet" href="'+root+'/h-designsystem/styles.css">\n'+markup+'\n<script type="module">\nimport { configureDesignSystem } from "'+root+'/h-designsystem/h-designsystem.js";\n'+(args.responsive?configure:'')+'\n</script>';
}};
