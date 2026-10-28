import type { Args } from '../preview';
import { htmlSource } from './html';
export const jspSource = (args: Args) => htmlSource(args, '${pageContext.request.contextPath}/assets');
