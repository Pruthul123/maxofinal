import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as prismic from '@prismicio/client';
import { asImageSrc } from '@prismicio/helpers';
import { createPrismicClient } from '../../prismicClient';
import StaggeredMenu from '../StaggeredMenu';
import SEO from '../SEO';
import '../projects/projects.css';

type CategoryDoc = {
  id: string;
  uid: string | null;
  data: {
    title?: string;
    description?: string;
  };
};

type ProjectDoc = {
  id: string;
  uid: string | null;
  data: {
    title?: string;
    summary?: string;
    hero_image?: any;
    category?: any;
  };
};

export default function WorkCategoryPage() {
  const navigate = useNavigate();
  const { categoryUid } = useParams();

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  const client = useMemo(() => createPrismicClient(), []);
  const [category, setCategory] = useState<CategoryDoc | null>(null);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (!client) {
          throw new Error('Prismic is not configured. Set VITE_PRISMIC_REPO_NAME.');
        }
        if (!categoryUid) {
          throw new Error('Missing category.');
        }

        const categoryDoc = (await client.getByUID('work_category', categoryUid)) as unknown as CategoryDoc;

        // Fetch projects ordered by manual order field (lower number appears first)
        const projectDocs = (await client.getAllByType('project', {
          filters: [prismic.filter.at('my.project.category', categoryDoc.id)],
          orderings: {
            field: 'my.project.order',
            direction: 'asc',
          },
          pageSize: 100,
        })) as unknown as ProjectDoc[];

        if (cancelled) return;
        setCategory(categoryDoc);
        setProjects(projectDocs);
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
  }, [client, categoryUid]);

  return (
    <div className="project-page">
      <SEO 
        title={`${category?.data?.title || 'Category'} Projects | MAXO Architects`}
        description={category?.data?.description || `Explore MAXO's ${category?.data?.title || 'architectural'} projects. Innovative design solutions and expert architectural services.`}
        keywords={`MAXO ${category?.data?.title || 'projects'}, ${category?.data?.title || 'architecture'}, architectural design, ${categoryUid}`}
        url={`https://maxo.co.in/work/${categoryUid}`}
        image="https://maxo.co.in/maxo-logo.jpeg"
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

      <button
        onClick={() => navigate('/work')}
        className="return-to-work"
        aria-label="Return to Work"
        type="button"
      >
        <span className="return-to-work-arrow">←</span>
        <span>Return to Work</span>
      </button>

      <section className="project-section">
        {/* Only render header after category data is loaded */}
        {!loading && category && (
          <div className="section-header">
            <h1 className="section-title">{category.data?.title || 'Category'}</h1>
            {category.data?.description ? (
              <p style={{ marginTop: '12px', color: '#555', lineHeight: 1.7 }}>{category.data.description}</p>
            ) : null}
          </div>
        )}

        {loading ? <p>Loading...</p> : null}
        {error ? <p style={{ color: '#b00020' }}>{error}</p> : null}

        {!loading && !error ? (
          <div className="projects-grid">
            {projects.map((p) => {
              const imageUrl = asImageSrc((p.data as any).hero_image);
              const projectTitle = p.data?.title || p.uid || 'Project';
              const projectKey = p.uid || p.id;
              const projectHref = `/work/${categoryUid}/${projectKey}`;
              const projectSummary = (p.data as any).project_summary || (p.data as any).summary;
              return (
                <div className="project-card-wrapper" key={p.id}>
                  <div className="project-card-label">
                    <span className="label-dot" />
                    <h2 className="label-title">{projectTitle}</h2>
                  </div>

                  <div
                    className="project-card-image"
                    onClick={() => {
                      navigate(projectHref);
                    }}
                    style={{
                      cursor: 'pointer',
                      opacity: 1,
                    }}
                  >
                    {imageUrl ? <img src={imageUrl} alt={projectTitle} /> : null}
                  </div>

                  {projectSummary ? (
                    <p style={{ color: '#555', lineHeight: 1.6, marginTop: '8px' }}>{projectSummary}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
