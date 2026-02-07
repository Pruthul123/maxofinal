import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PrismicRichText } from '@prismicio/react';
import { asImageSrc } from '@prismicio/helpers';
import { createPrismicClient } from '../../prismicClient';
import StaggeredMenu from '../StaggeredMenu';
import SEO from '../SEO';
import './WorkProjectPage.css';

type ProjectDoc = {
  id: string;
  uid: string | null;
  tags?: string[];
  data: {
    title?: string;
    summary?: string;
    project_summary?: string;
    address?: string;
    hero_image?: any;
    body?: any;
    gallery?: Array<{ image?: any; caption?: string }>;
    category?: { uid?: string; data?: { title?: string } } | null;
    tags?: Array<{ tag?: string }>;
  };
};

export default function WorkProjectPage() {
  const navigate = useNavigate();
  const { categoryUid, projectUid } = useParams();

  const backHref = categoryUid ? `/work/${categoryUid}` : '/work';

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  const client = useMemo(() => createPrismicClient(), []);
  const [project, setProject] = useState<ProjectDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [projectUid]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (!client) {
          throw new Error('Prismic is not configured. Set VITE_PRISMIC_REPO_NAME.');
        }
        if (!projectUid) {
          throw new Error('Missing project.');
        }
        if (projectUid === 'null' || projectUid === 'undefined') {
          throw new Error('Missing project UID.');
        }

        let doc: ProjectDoc;
        try {
          doc = (await client.getByUID('project', projectUid, {
            lang: '*',
            fetchLinks: ['work_category.title'],
          })) as unknown as ProjectDoc;
        } catch (uidErr) {
          // If the URL param is a Prismic document ID (because the doc has no UID), fall back to getByID.
          doc = (await client.getByID(projectUid, {
            lang: '*',
            fetchLinks: ['work_category.title'],
          })) as unknown as ProjectDoc;
        }

        if (cancelled) return;
        setProject(doc);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [client, projectUid]);

  if (loading) {
    return (
      <div className="work-project" style={{ padding: '2rem' }}>
        <StaggeredMenu
          items={menuItems}
          position="left"
          colors={['#fff', '#fff', '#fff']}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          accentColor="#888"
          isFixed
        />
        <button
          onClick={() => navigate('/work')}
          className="return-to-work"
          aria-label="Return to Work"
          type="button"
        >
          <span className="return-to-work-arrow">←</span>
          <span>Return to Work</span>
        </button>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="work-project" style={{ padding: '2rem' }}>
        <StaggeredMenu
          items={menuItems}
          position="left"
          colors={['#fff', '#fff', '#fff']}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          accentColor="#888"
          isFixed
        />
        <button
          onClick={() => navigate('/work')}
          className="return-to-work"
          aria-label="Return to Work"
          type="button"
        >
          <span className="return-to-work-arrow">←</span>
          <span>Return to Work</span>
        </button>
        <p style={{ color: '#b00020' }}>{error || 'Not found'}</p>
      </div>
    );
  }

  const title = project.data.title || project.uid || 'Project';
  const heroUrl = asImageSrc(project.data.hero_image as any);
  const categoryTitle = (project.data.category as any)?.data?.title || categoryUid;

  // Backward/forward compatibility with evolving Prismic schema:
  // - If you rename old `summary` -> `address`, `data.address` will exist.
  // - If you add a new summary field, prefer `data.project_summary` then `data.summary`.
  const address = project.data.address || (project.data as any)?.location;
  const documentTags = (project.tags || []).filter(Boolean);
  const fieldTags = (project.data.tags || [])
    .map((t) => t.tag)
    .filter((t): t is string => Boolean(t));
  const tags = Array.from(new Set([...documentTags, ...fieldTags]));

  const galleryItems = (project.data.gallery || [])
    .map((g) => ({
      url: asImageSrc((g as any).image),
      caption: (g as any).caption as string | undefined,
    }))
    .filter((g) => Boolean(g.url));

  const allImages = [
    heroUrl ? { url: heroUrl, caption: undefined as string | undefined } : null,
    ...galleryItems,
  ]
    .filter(Boolean)
    .map((g) => g as { url: string; caption?: string });

  const uniqueImages = allImages.filter((img, idx, arr) => arr.findIndex((x) => x.url === img.url) === idx);
  const primaryImage = uniqueImages[0];
  const extraImages = uniqueImages.slice(1);

  const previewImages = extraImages.slice(0, 4);
  const remainingImages = extraImages.slice(4);
  const shownImages = showAllImages ? extraImages : previewImages;

  const rightClass = shownImages.length === 0 ? 'work-right single' : 'work-right';

  return (
    <div className="work-project">
      <SEO 
        title={`${title || 'Project'} | MAXO Architects`}
        description={`Discover ${title || 'this project'} by MAXO Architects. ${address || ''} Expert architectural design and innovative solutions.`}
        keywords={`MAXO ${title || 'project'}, ${categoryTitle || 'architecture'}, architectural design, ${address || ''}`}
        url={`https://maxo.co.in/work/${categoryUid}/${projectUid}`}
        image={heroUrl || "https://maxo.co.in/maxo-logo.jpeg"}
      />
      
      <StaggeredMenu
        items={menuItems}
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="#000"
        openMenuButtonColor="#000"
        accentColor="#888"
        isFixed
      />
      <div className="work-hero">
        {heroUrl ? <div className="work-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} /> : null}
        <div className="work-hero-overlay" />
      </div>

      <div className="work-body">
        <div className="work-body-grid">
          <div className="work-left">
            <div className="work-project-meta">
              {categoryTitle ? <p className="work-project-kicker">{String(categoryTitle)}</p> : null}
              <h1 className="work-project-title">{title}</h1>
              {address ? <p className="work-project-address">{String(address)}</p> : null}
              {tags.length ? (
                <div className="work-project-tags" aria-label="Project tags">
                  {tags.map((t) => (
                    <span key={t} className="work-project-tag">{t}</span>
                  ))}
                </div>
              ) : null}
            </div>

            {project.data.body ? <PrismicRichText field={project.data.body} /> : null}

            <button
              type="button"
              className="work-return"
              onClick={() => navigate(backHref)}
            >
              <span className="work-return-arrow">←</span>
              <span>Return to category</span>
            </button>
          </div>

          <div id="project-gallery" className={rightClass}>
            {primaryImage ? (
              <div className="work-image-primaryWrap">
                <img className="work-image-primary" src={primaryImage.url} alt={title} />
              </div>
            ) : null}

            {shownImages.map((g) => (
              <img key={g.url} src={g.url} alt={g.caption || title} />
            ))}

            {!showAllImages && remainingImages.length ? (
              <button
                type="button"
                className="work-view-more"
                onClick={() => setShowAllImages(true)}
              >
                View more images
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
